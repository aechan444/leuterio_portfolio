import time
import json
import network
import machine
import dht

try:
    import urequests as requests
except ImportError:
    requests = None


WIFI_SSID = "YOUR_WIFI_NAME"
WIFI_PASSWORD = "YOUR_WIFI_PASSWORD"
FLASK_BASE_URL = "http://192.168.1.100:5000"
DEVICE_ID = "shoe-organizer-esp32"


class Pins:
    DHT_PIN = 4
    MQ135_AO = 34
    MOISTURE_AO = 35
    IR_SENSOR = 27
    DOOR_SWITCH = 26
    FAN_RELAY = 18
    PUMP_RELAY = 19
    BRUSH_RELAY = 23
    BUZZER = 5
    STATUS_LED = 2


class Timing:
    WIFI_RETRY_MS = 15000
    SENSOR_SAMPLE_MS = 2000
    SERVER_SYNC_MS = 5000
    SHOE_STABLE_MS = 3000
    POST_CYCLE_COOLDOWN_MS = 60000
    MAX_DRY_MS = 180000
    MAX_DEODORIZE_MS = 120000
    MAX_CLEAN_MS = 90000
    MAX_PUMP_BURST_MS = 4000
    MAX_BRUSH_RUN_MS = 20000


class Thresholds:
    HUMIDITY_HIGH = 72.0
    HUMIDITY_RECOVER = 60.0
    MQ135_HIGH = 2400
    MQ135_RECOVER = 1800
    MOISTURE_WET = 2200
    MOISTURE_RECOVER = 1800


MODE_IDLE = "IDLE"
MODE_MONITORING = "MONITORING"
MODE_DRYING = "DRYING"
MODE_DEODORIZING = "DEODORIZING"
MODE_CLEANING = "CLEANING"
MODE_FAULT = "FAULT"


wifi = network.WLAN(network.STA_IF)
dht_sensor = dht.DHT22(machine.Pin(Pins.DHT_PIN))
mq135_adc = machine.ADC(machine.Pin(Pins.MQ135_AO))
moisture_adc = machine.ADC(machine.Pin(Pins.MOISTURE_AO))
ir_sensor = machine.Pin(Pins.IR_SENSOR, machine.Pin.IN, machine.Pin.PULL_UP)
door_switch = machine.Pin(Pins.DOOR_SWITCH, machine.Pin.IN, machine.Pin.PULL_UP)
fan_relay = machine.Pin(Pins.FAN_RELAY, machine.Pin.OUT)
pump_relay = machine.Pin(Pins.PUMP_RELAY, machine.Pin.OUT)
brush_relay = machine.Pin(Pins.BRUSH_RELAY, machine.Pin.OUT)
buzzer = machine.Pin(Pins.BUZZER, machine.Pin.OUT)
status_led = machine.Pin(Pins.STATUS_LED, machine.Pin.OUT)

mq135_adc.atten(machine.ADC.ATTN_11DB)
moisture_adc.atten(machine.ADC.ATTN_11DB)


state = {
    "mode": MODE_IDLE,
    "manual_mode": "auto",
    "last_sample_ms": 0,
    "last_sync_ms": 0,
    "mode_started_ms": 0,
    "shoe_detected_ms": 0,
    "cooldown_until_ms": 0,
    "fault_count": 0,
    "wifi_last_attempt_ms": 0,
    "status": {
        "device_id": DEVICE_ID,
        "temperature_c": None,
        "humidity": None,
        "mq135": 0,
        "moisture": 0,
        "shoe_present": False,
        "door_closed": True,
        "wifi_connected": False,
        "fault": "",
    },
}


def now_ms():
    return time.ticks_ms()


def elapsed_ms(start_ms):
    return time.ticks_diff(now_ms(), start_ms)


def set_outputs(fan=False, pump=False, brush=False, led=False):
    fan_relay.value(1 if fan else 0)
    pump_relay.value(1 if pump else 0)
    brush_relay.value(1 if brush else 0)
    status_led.value(1 if led else 0)


def stop_outputs():
    set_outputs(False, False, False, False)


def buzz(count=2, gap_ms=120):
    for _ in range(count):
        buzzer.value(1)
        time.sleep_ms(gap_ms)
        buzzer.value(0)
        time.sleep_ms(gap_ms)


def connect_wifi():
    if wifi.isconnected():
        return True

    if elapsed_ms(state["wifi_last_attempt_ms"]) < Timing.WIFI_RETRY_MS:
        return False

    state["wifi_last_attempt_ms"] = now_ms()
    wifi.active(True)
    wifi.connect(WIFI_SSID, WIFI_PASSWORD)

    for _ in range(20):
        if wifi.isconnected():
            break
        time.sleep_ms(500)

    state["status"]["wifi_connected"] = wifi.isconnected()
    return wifi.isconnected()


def read_average(adc, samples=8):
    total = 0
    for _ in range(samples):
        total += adc.read()
        time.sleep_ms(5)
    return total // samples


def sample_sensors():
    try:
        dht_sensor.measure()
        temperature_c = dht_sensor.temperature()
        humidity = dht_sensor.humidity()
        fault = ""
    except Exception as exc:
        temperature_c = None
        humidity = None
        fault = "DHT22 read failed: {}".format(exc)

    state["status"]["temperature_c"] = temperature_c
    state["status"]["humidity"] = humidity
    state["status"]["mq135"] = read_average(mq135_adc)
    state["status"]["moisture"] = read_average(moisture_adc)
    state["status"]["shoe_present"] = ir_sensor.value() == 0
    state["status"]["door_closed"] = door_switch.value() == 0
    state["status"]["fault"] = fault

    if fault:
        state["fault_count"] += 1
    else:
        state["fault_count"] = 0


def should_dry():
    humidity = state["status"]["humidity"]
    moisture = state["status"]["moisture"]
    return humidity is not None and (
        humidity >= Thresholds.HUMIDITY_HIGH or moisture >= Thresholds.MOISTURE_WET
    )


def should_deodorize():
    return state["status"]["mq135"] >= Thresholds.MQ135_HIGH


def recovered():
    humidity = state["status"]["humidity"]
    if humidity is None:
        return False
    return (
        humidity <= Thresholds.HUMIDITY_RECOVER
        and state["status"]["moisture"] <= Thresholds.MOISTURE_RECOVER
        and state["status"]["mq135"] <= Thresholds.MQ135_RECOVER
    )


def enter_mode(mode_name, fault_message=""):
    state["mode"] = mode_name
    state["mode_started_ms"] = now_ms()
    state["status"]["fault"] = fault_message

    if mode_name == MODE_IDLE:
        stop_outputs()
    elif mode_name == MODE_MONITORING:
        set_outputs(led=True)
    elif mode_name == MODE_DRYING:
        set_outputs(fan=True, led=True)
    elif mode_name == MODE_DEODORIZING:
        set_outputs(fan=True, led=True)
    elif mode_name == MODE_CLEANING:
        set_outputs(fan=True, pump=True, brush=True, led=True)
    elif mode_name == MODE_FAULT:
        stop_outputs()
        buzz(3)


def apply_manual_or_auto():
    command = state["manual_mode"]
    if command == "stop":
        enter_mode(MODE_IDLE)
        return
    if command == "dry":
        enter_mode(MODE_DRYING)
        return
    if command == "deodorize":
        enter_mode(MODE_DEODORIZING)
        return
    if command == "clean":
        enter_mode(MODE_CLEANING)
        return

    if not state["status"]["shoe_present"]:
        enter_mode(MODE_IDLE)
        return

    if should_dry() and should_deodorize():
        enter_mode(MODE_CLEANING)
    elif should_dry():
        enter_mode(MODE_DRYING)
    elif should_deodorize():
        enter_mode(MODE_DEODORIZING)
    else:
        enter_mode(MODE_MONITORING)


def enforce_safety():
    if state["fault_count"] >= 3:
        enter_mode(MODE_FAULT, "Repeated sensor read failure")
        return

    if state["mode"] in (MODE_DRYING, MODE_DEODORIZING, MODE_CLEANING):
        if not state["status"]["door_closed"]:
            enter_mode(MODE_FAULT, "Door opened during active cycle")
            return

    runtime_ms = elapsed_ms(state["mode_started_ms"])

    if state["mode"] == MODE_DRYING and runtime_ms >= Timing.MAX_DRY_MS:
        state["cooldown_until_ms"] = now_ms() + Timing.POST_CYCLE_COOLDOWN_MS
        enter_mode(MODE_MONITORING)
    elif state["mode"] == MODE_DEODORIZING and runtime_ms >= Timing.MAX_DEODORIZE_MS:
        state["cooldown_until_ms"] = now_ms() + Timing.POST_CYCLE_COOLDOWN_MS
        enter_mode(MODE_MONITORING)
    elif state["mode"] == MODE_CLEANING:
        if runtime_ms >= Timing.MAX_CLEAN_MS:
            state["cooldown_until_ms"] = now_ms() + Timing.POST_CYCLE_COOLDOWN_MS
            enter_mode(MODE_MONITORING)
            return
        if runtime_ms >= Timing.MAX_PUMP_BURST_MS:
            pump_relay.value(0)
        if runtime_ms >= Timing.MAX_BRUSH_RUN_MS:
            brush_relay.value(0)


def update_state_machine():
    if state["mode"] == MODE_FAULT:
        if state["status"]["door_closed"] and not state["status"]["fault"]:
            enter_mode(MODE_IDLE)
        return

    if not state["status"]["shoe_present"]:
        state["shoe_detected_ms"] = 0
        if state["mode"] != MODE_IDLE:
            enter_mode(MODE_IDLE)
        return

    if state["shoe_detected_ms"] == 0:
        state["shoe_detected_ms"] = now_ms()

    if elapsed_ms(state["shoe_detected_ms"]) < Timing.SHOE_STABLE_MS:
        enter_mode(MODE_MONITORING)
        return

    if time.ticks_diff(state["cooldown_until_ms"], now_ms()) > 0:
        enter_mode(MODE_MONITORING)
        return

    if state["mode"] in (MODE_DRYING, MODE_DEODORIZING, MODE_CLEANING) and recovered():
        state["cooldown_until_ms"] = now_ms() + Timing.POST_CYCLE_COOLDOWN_MS
        enter_mode(MODE_MONITORING)
        return

    apply_manual_or_auto()


def sync_with_server():
    if not requests:
        return

    if not connect_wifi():
        state["status"]["wifi_connected"] = False
        return

    state["status"]["wifi_connected"] = True
    payload = {
        "device_id": DEVICE_ID,
        "mode": state["mode"],
        "manual_mode": state["manual_mode"],
        "status": state["status"],
    }

    response = None
    try:
        response = requests.post(
            FLASK_BASE_URL + "/api/status",
            headers={"Content-Type": "application/json"},
            data=json.dumps(payload),
        )
        if response.status_code == 200:
            command_data = response.json()
            state["manual_mode"] = command_data.get("command", "auto")
    except Exception as exc:
        state["status"]["wifi_connected"] = False
        state["status"]["fault"] = "Server sync failed: {}".format(exc)
    finally:
        if response:
            response.close()


def boot_sequence():
    stop_outputs()
    buzz(1)
    connect_wifi()
    enter_mode(MODE_IDLE)


boot_sequence()

while True:
    current_ms = now_ms()

    if time.ticks_diff(current_ms, state["last_sample_ms"]) >= Timing.SENSOR_SAMPLE_MS:
        state["last_sample_ms"] = current_ms
        sample_sensors()
        enforce_safety()
        update_state_machine()

    if time.ticks_diff(current_ms, state["last_sync_ms"]) >= Timing.SERVER_SYNC_MS:
        state["last_sync_ms"] = current_ms
        sync_with_server()

    time.sleep_ms(50)
