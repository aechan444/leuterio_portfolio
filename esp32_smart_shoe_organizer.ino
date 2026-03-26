#include <DHT.h>

// Week 9 optimized ESP32 firmware for the Smart Shoe Organizer prototype.
// Sensors: MQ-135, DHT22, moisture probe, optional dust sensor, IR shoe sensor,
// and door switch. Outputs: fan, pump, brush motor, buzzer, status LED.

namespace Pins {
const uint8_t DHT_PIN = 4;
const uint8_t MQ135_AO = 34;
const uint8_t MOISTURE_AO = 35;
const uint8_t DUST_AO = 32;
const uint8_t DUST_LED = 25;
const uint8_t SHOE_IR = 27;
const uint8_t DOOR_SWITCH = 26;
const uint8_t FAN_RELAY = 18;
const uint8_t PUMP_RELAY = 19;
const uint8_t BRUSH_RELAY = 23;
const uint8_t BUZZER = 5;
const uint8_t STATUS_LED = 2;
}

namespace Timing {
const uint32_t SENSOR_SAMPLE_MS = 2000;
const uint32_t STATUS_REPORT_MS = 5000;
const uint32_t SENSOR_WARMUP_MS = 30000;
const uint32_t SHOE_STABLE_MS = 3000;
const uint32_t POST_CYCLE_COOLDOWN_MS = 60000;
const uint32_t MAX_DRY_MS = 180000;
const uint32_t MAX_DEODORIZE_MS = 120000;
const uint32_t MAX_CLEAN_MS = 90000;
const uint32_t MAX_PUMP_BURST_MS = 4000;
const uint32_t MAX_BRUSH_RUN_MS = 20000;
const uint32_t MAX_DOOR_OPEN_RUNTIME_MS = 500;
const uint32_t BUZZ_MS = 120;
}

namespace Thresholds {
const float HUMIDITY_HIGH = 72.0F;
const float HUMIDITY_RECOVER = 60.0F;
const int MQ135_HIGH = 1900;
const int MQ135_RECOVER = 1500;
const int MOISTURE_WET = 2100;
const int MOISTURE_RECOVER = 1700;
const int DUST_DIRTY = 1500;
const int SENSOR_FAULT_LOW = 20;
const int SENSOR_FAULT_HIGH = 4090;
}

enum SystemMode : uint8_t {
  MODE_IDLE,
  MODE_MONITORING,
  MODE_DRYING,
  MODE_DEODORIZING,
  MODE_CLEANING,
  MODE_FAULT
};

struct SensorData {
  float temperatureC = NAN;
  float humidity = NAN;
  int mq135 = 0;
  int moisture = 0;
  int dust = 0;
  bool shoePresent = false;
  bool doorClosed = true;
  bool dhtHealthy = false;
  bool analogHealthy = true;
};

struct Runtime {
  SystemMode mode = MODE_IDLE;
  uint32_t modeStartedAt = 0;
  uint32_t lastSampleAt = 0;
  uint32_t lastReportAt = 0;
  uint32_t shoeDetectedAt = 0;
  uint32_t cooldownUntil = 0;
  uint32_t fanStartedAt = 0;
  uint32_t pumpStartedAt = 0;
  uint32_t brushStartedAt = 0;
  uint32_t doorOpenedAt = 0;
  uint16_t consecutiveFaults = 0;
  bool pumpActive = false;
  bool brushActive = false;
};

DHT dht(Pins::DHT_PIN, DHT22);
SensorData sensors;
Runtime runtime;

int readAveragedAnalog(uint8_t pin, uint8_t samples = 8) {
  uint32_t total = 0;
  for (uint8_t i = 0; i < samples; ++i) {
    total += analogRead(pin);
    delayMicroseconds(200);
  }
  return static_cast<int>(total / samples);
}

int readDustLevel() {
  digitalWrite(Pins::DUST_LED, LOW);
  delayMicroseconds(280);
  int reading = analogRead(Pins::DUST_AO);
  delayMicroseconds(40);
  digitalWrite(Pins::DUST_LED, HIGH);
  delayMicroseconds(9680);
  return reading;
}

void setOutputs(bool fanOn, bool pumpOn, bool brushOn, bool ledOn) {
  digitalWrite(Pins::FAN_RELAY, fanOn ? HIGH : LOW);
  digitalWrite(Pins::PUMP_RELAY, pumpOn ? HIGH : LOW);
  digitalWrite(Pins::BRUSH_RELAY, brushOn ? HIGH : LOW);
  digitalWrite(Pins::STATUS_LED, ledOn ? HIGH : LOW);

  runtime.pumpActive = pumpOn;
  runtime.brushActive = brushOn;

  if (fanOn && runtime.fanStartedAt == 0) {
    runtime.fanStartedAt = millis();
  }
  if (!fanOn) {
    runtime.fanStartedAt = 0;
  }

  if (pumpOn && runtime.pumpStartedAt == 0) {
    runtime.pumpStartedAt = millis();
  }
  if (!pumpOn) {
    runtime.pumpStartedAt = 0;
  }

  if (brushOn && runtime.brushStartedAt == 0) {
    runtime.brushStartedAt = millis();
  }
  if (!brushOn) {
    runtime.brushStartedAt = 0;
  }
}

void buzz(uint8_t count) {
  for (uint8_t i = 0; i < count; ++i) {
    digitalWrite(Pins::BUZZER, HIGH);
    delay(Timing::BUZZ_MS);
    digitalWrite(Pins::BUZZER, LOW);
    delay(Timing::BUZZ_MS);
  }
}

void stopAllOutputs() {
  setOutputs(false, false, false, false);
}

const __FlashStringHelper* modeName(SystemMode mode) {
  switch (mode) {
    case MODE_IDLE: return F("IDLE");
    case MODE_MONITORING: return F("MONITORING");
    case MODE_DRYING: return F("DRYING");
    case MODE_DEODORIZING: return F("DEODORIZING");
    case MODE_CLEANING: return F("CLEANING");
    case MODE_FAULT: return F("FAULT");
    default: return F("UNKNOWN");
  }
}

void enterMode(SystemMode nextMode) {
  if (runtime.mode == nextMode) {
    return;
  }

  stopAllOutputs();
  runtime.mode = nextMode;
  runtime.modeStartedAt = millis();

  switch (nextMode) {
    case MODE_IDLE:
      digitalWrite(Pins::STATUS_LED, LOW);
      break;
    case MODE_MONITORING:
      digitalWrite(Pins::STATUS_LED, HIGH);
      break;
    case MODE_DRYING:
      setOutputs(true, false, false, true);
      break;
    case MODE_DEODORIZING:
      setOutputs(true, false, false, true);
      break;
    case MODE_CLEANING:
      setOutputs(true, true, true, true);
      break;
    case MODE_FAULT:
      stopAllOutputs();
      buzz(3);
      break;
  }
}

bool analogLooksFaulty(int value) {
  return value <= Thresholds::SENSOR_FAULT_LOW || value >= Thresholds::SENSOR_FAULT_HIGH;
}

void sampleSensors() {
  sensors.temperatureC = dht.readTemperature();
  sensors.humidity = dht.readHumidity();
  sensors.dhtHealthy = !isnan(sensors.temperatureC) && !isnan(sensors.humidity);

  sensors.mq135 = readAveragedAnalog(Pins::MQ135_AO);
  sensors.moisture = readAveragedAnalog(Pins::MOISTURE_AO);
  sensors.dust = readDustLevel();
  sensors.shoePresent = digitalRead(Pins::SHOE_IR) == LOW;
  sensors.doorClosed = digitalRead(Pins::DOOR_SWITCH) == LOW;

  sensors.analogHealthy =
    !analogLooksFaulty(sensors.mq135) &&
    !analogLooksFaulty(sensors.moisture) &&
    !analogLooksFaulty(sensors.dust);

  if (!sensors.dhtHealthy || !sensors.analogHealthy) {
    runtime.consecutiveFaults++;
  } else {
    runtime.consecutiveFaults = 0;
  }
}

bool shouldDry() {
  return sensors.dhtHealthy &&
         (sensors.humidity >= Thresholds::HUMIDITY_HIGH ||
          sensors.moisture >= Thresholds::MOISTURE_WET);
}

bool shouldDeodorize() {
  return sensors.mq135 >= Thresholds::MQ135_HIGH;
}

bool shouldClean() {
  return shouldDry() &&
         shouldDeodorize() &&
         sensors.dust >= Thresholds::DUST_DIRTY;
}

bool cycleRecovered() {
  return sensors.dhtHealthy &&
         sensors.humidity <= Thresholds::HUMIDITY_RECOVER &&
         sensors.moisture <= Thresholds::MOISTURE_RECOVER &&
         sensors.mq135 <= Thresholds::MQ135_RECOVER;
}

void reportStatus() {
  Serial.print(F("mode="));
  Serial.print(modeName(runtime.mode));
  Serial.print(F(" shoe="));
  Serial.print(sensors.shoePresent ? F("1") : F("0"));
  Serial.print(F(" door="));
  Serial.print(sensors.doorClosed ? F("closed") : F("open"));
  Serial.print(F(" tempC="));
  Serial.print(sensors.temperatureC, 1);
  Serial.print(F(" humidity="));
  Serial.print(sensors.humidity, 1);
  Serial.print(F(" mq135="));
  Serial.print(sensors.mq135);
  Serial.print(F(" moisture="));
  Serial.print(sensors.moisture);
  Serial.print(F(" dust="));
  Serial.print(sensors.dust);
  Serial.print(F(" faults="));
  Serial.println(runtime.consecutiveFaults);
}

void enforceFailsafes(uint32_t now) {
  if (!sensors.doorClosed && runtime.mode != MODE_IDLE && runtime.mode != MODE_FAULT) {
    if (runtime.doorOpenedAt == 0) {
      runtime.doorOpenedAt = now;
    }
    if (now - runtime.doorOpenedAt >= Timing::MAX_DOOR_OPEN_RUNTIME_MS) {
      enterMode(MODE_FAULT);
      return;
    }
  } else {
    runtime.doorOpenedAt = 0;
  }

  if (runtime.pumpActive && now - runtime.pumpStartedAt >= Timing::MAX_PUMP_BURST_MS) {
    digitalWrite(Pins::PUMP_RELAY, LOW);
    runtime.pumpActive = false;
    runtime.pumpStartedAt = 0;
  }

  if (runtime.brushActive && now - runtime.brushStartedAt >= Timing::MAX_BRUSH_RUN_MS) {
    digitalWrite(Pins::BRUSH_RELAY, LOW);
    runtime.brushActive = false;
    runtime.brushStartedAt = 0;
  }

  if (runtime.consecutiveFaults >= 3) {
    enterMode(MODE_FAULT);
  }
}

void handleMode(uint32_t now) {
  switch (runtime.mode) {
    case MODE_IDLE:
      if (now < Timing::SENSOR_WARMUP_MS) {
        return;
      }
      if (sensors.shoePresent) {
        if (runtime.shoeDetectedAt == 0) {
          runtime.shoeDetectedAt = now;
        }
        if (now - runtime.shoeDetectedAt >= Timing::SHOE_STABLE_MS && now >= runtime.cooldownUntil) {
          enterMode(MODE_MONITORING);
        }
      } else {
        runtime.shoeDetectedAt = 0;
      }
      break;

    case MODE_MONITORING:
      if (!sensors.shoePresent) {
        runtime.cooldownUntil = now + Timing::POST_CYCLE_COOLDOWN_MS;
        enterMode(MODE_IDLE);
        return;
      }
      if (!sensors.doorClosed) {
        enterMode(MODE_FAULT);
        return;
      }
      if (shouldClean()) {
        enterMode(MODE_CLEANING);
      } else if (shouldDry()) {
        enterMode(MODE_DRYING);
      } else if (shouldDeodorize()) {
        enterMode(MODE_DEODORIZING);
      }
      break;

    case MODE_DRYING:
      if (!sensors.shoePresent || cycleRecovered() ||
          now - runtime.modeStartedAt >= Timing::MAX_DRY_MS) {
        runtime.cooldownUntil = now + Timing::POST_CYCLE_COOLDOWN_MS;
        enterMode(MODE_MONITORING);
      }
      break;

    case MODE_DEODORIZING:
      if (!sensors.shoePresent || cycleRecovered() ||
          now - runtime.modeStartedAt >= Timing::MAX_DEODORIZING_MS) {
        runtime.cooldownUntil = now + Timing::POST_CYCLE_COOLDOWN_MS;
        enterMode(MODE_MONITORING);
      }
      break;

    case MODE_CLEANING:
      if (now - runtime.modeStartedAt >= Timing::MAX_CLEAN_MS || !sensors.shoePresent) {
        runtime.cooldownUntil = now + Timing::POST_CYCLE_COOLDOWN_MS;
        enterMode(MODE_MONITORING);
      } else {
        const bool pumpOn = (now - runtime.modeStartedAt) < Timing::MAX_PUMP_BURST_MS;
        const bool brushOn = (now - runtime.modeStartedAt) < Timing::MAX_BRUSH_RUN_MS;
        setOutputs(true, pumpOn, brushOn, true);
      }
      break;

    case MODE_FAULT:
      stopAllOutputs();
      if (sensors.dhtHealthy && sensors.analogHealthy && sensors.doorClosed) {
        runtime.consecutiveFaults = 0;
        runtime.cooldownUntil = now + Timing::POST_CYCLE_COOLDOWN_MS;
        enterMode(MODE_IDLE);
      }
      break;
  }
}

void setupPins() {
  pinMode(Pins::SHOE_IR, INPUT_PULLUP);
  pinMode(Pins::DOOR_SWITCH, INPUT_PULLUP);
  pinMode(Pins::FAN_RELAY, OUTPUT);
  pinMode(Pins::PUMP_RELAY, OUTPUT);
  pinMode(Pins::BRUSH_RELAY, OUTPUT);
  pinMode(Pins::BUZZER, OUTPUT);
  pinMode(Pins::STATUS_LED, OUTPUT);
  pinMode(Pins::DUST_LED, OUTPUT);

  digitalWrite(Pins::DUST_LED, HIGH);
  stopAllOutputs();
  digitalWrite(Pins::BUZZER, LOW);
}

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
  analogSetAttenuation(ADC_11db);
  setupPins();
  dht.begin();
  enterMode(MODE_IDLE);
  Serial.println(F("Smart Shoe Organizer controller booted."));
}

void loop() {
  const uint32_t now = millis();

  if (now - runtime.lastSampleAt >= Timing::SENSOR_SAMPLE_MS) {
    runtime.lastSampleAt = now;
    sampleSensors();
  }

  enforceFailsafes(now);
  handleMode(now);

  if (now - runtime.lastReportAt >= Timing::STATUS_REPORT_MS) {
    runtime.lastReportAt = now;
    reportStatus();
  }

  delay(20);
}
