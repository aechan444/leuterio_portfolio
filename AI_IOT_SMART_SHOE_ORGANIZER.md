# Design and Development of an AI-Driven IoT Smart Shoe Organizer with Automated Cleaning System for Personal Use Using the AIDUA Model

## Week 9 Deliverable Focus

This document completes the Week 9 requirement for:

1. optimized ESP32 code in Python for memory, speed, and power efficiency
2. added error handling, timeouts, and fail-safes
3. improved stability through clearer integration of controller code, wiring, and enclosure planning

The matching controller files are:

- `main.py` for ESP32 MicroPython in Thonny
- `flask_dashboard.py` for the laptop dashboard
- `templates/dashboard.html` for the dashboard interface

## Project Goal

The smart shoe organizer is a single-shoe cleaning and drying chamber that:

- detects when a shoe is inserted
- reads odor, humidity, moisture, and optional dust conditions
- decides whether to monitor, dry, deodorize, or clean
- drives the fan, pump, and brush safely
- stops automatically when unsafe or abnormal conditions are detected

## AIDUA Model Used in the System

- Acquisition: sensors collect shoe-condition and chamber-condition data
- Interpretation: the ESP32 converts raw sensor data into usable condition values
- Decision: a rule-based decision engine selects the proper operation mode
- Utilization: status can be sent to serial output, dashboard, or future IoT app
- Action: the controller activates the fan, pump, brush, buzzer, and indicator LED

## Final Prototype Scope

For a realistic student prototype, the final controlled inputs and outputs are:

### Inputs

- MQ-135 gas sensor for odor approximation
- DHT22 for humidity and temperature
- moisture sensor for dampness or drip detection
- optional dust sensor for chamber cleanliness
- IR sensor for shoe presence
- door switch for chamber safety interlock

### Outputs

- relay-driven fan for drying and deodorizing airflow
- relay-driven pump for foam spray
- relay-driven brush motor for gentle cleaning
- buzzer for fault notification
- status LED for local state indication

## Python System Design Summary

The ESP32 MicroPython code is implemented as a non-blocking state machine with these modes:

- `MODE_IDLE`
- `MODE_MONITORING`
- `MODE_DRYING`
- `MODE_DEODORIZING`
- `MODE_CLEANING`
- `MODE_FAULT`

This approach is better than a long delay-based sequence because it:

- keeps sensor updates responsive
- reduces unnecessary actuator runtime
- lowers the chance of lockups
- makes timeout and safety control easier

## Optimization and Robustness Enhancements

### 1. Memory Optimization

The Python controller improves memory efficiency by:

- using `const` values for thresholds and timings
- using `uint8_t`, `uint16_t`, and `uint32_t` where appropriate
- using a compact `enum` for system mode
- using small dictionaries and fixed thresholds
- avoiding unnecessary object creation inside the main loop

### 2. Speed Optimization

The Python controller improves execution speed by:

- sampling sensors on fixed intervals with `millis()`
- averaging analog reads to reduce noise without heavy processing
- using direct state transitions instead of nested blocking sequences
- syncing with Flask only every few seconds instead of sending every loop cycle

### 3. Power Optimization

The Python controller improves power efficiency by:

- running actuators only when thresholds require it
- stopping pump and brush after strict burst durations
- returning to monitoring or idle after recovery or timeout
- using cooldown periods to prevent repeated rapid cycling

## Decision Logic

The control logic is intentionally simple and defensible for a prototype:

```text
If shoe not present -> stay IDLE
If shoe present and stable -> MONITORING

If humidity high or moisture high -> DRYING
If odor high -> DEODORIZING
If humidity high and odor high and dust high -> CLEANING

If sensor faults repeat or door opens during operation -> FAULT
If readings recover or max runtime is reached -> return to MONITORING or IDLE
```

## Sensor Threshold Strategy

The prototype uses configurable thresholds stored in firmware:

- high humidity threshold
- humidity recovery threshold
- high odor threshold
- odor recovery threshold
- wet-shoe threshold
- wet-shoe recovery threshold
- dust threshold

These values can be recalibrated during testing in `main.py` without changing the system structure.

## Error Handling, Timeouts, and Fail-Safes

### Implemented Error Handling

The Python controller now checks for:

- invalid DHT22 readings
- suspicious analog values near ADC limits
- repeated sensor faults
- unsafe door-open condition during operation
- actuator overrun conditions

### Implemented Timeouts

To satisfy Week 9 robustness requirements, the firmware includes:

- sensor warm-up delay for MQ-135 stabilization
- shoe detection stability delay
- maximum drying duration
- maximum deodorizing duration
- maximum cleaning duration
- maximum pump burst duration
- maximum brush runtime
- post-cycle cooldown delay

### Implemented Fail-Safes

- all actuators turn off when the system enters `MODE_FAULT`
- the chamber must be closed before active cleaning can continue
- pump and brush cannot run indefinitely
- repeated bad sensor readings force the system into safe mode
- the controller must recover to healthy readings before leaving fault state

## Recommended Serial Monitoring Output

The Flask dashboard and ESP32 status exchange report:

- current mode
- shoe presence
- door state
- temperature
- humidity
- MQ-135 value
- moisture value
- dust value
- fault counter

This gives enough data for calibration, testing, and project defense.

## Why the AI Claim Is Still Defensible

For a prototype, the intelligence layer is a rule-based decision engine rather than a trained neural model. This is acceptable because the system still:

- acquires sensor data
- interprets real conditions
- chooses between multiple maintenance actions
- uses adaptive thresholds and recovery logic

This keeps the project credible and technically explainable.

## Flask Dashboard Workflow

1. flash MicroPython to the ESP32
2. open Thonny and save `main.py` to the ESP32 as `main.py`
3. edit Wi-Fi credentials and Flask server IP in `main.py`
4. install Flask on the laptop using `requirements-flask-dashboard.txt`
5. run `python flask_dashboard.py`
6. power the ESP32 and monitor live status from the browser

## Suggested Demonstration Flow

1. insert a shoe and close the chamber
2. allow the MicroPython controller to stabilize and read sensors
3. show live Flask values for humidity, odor, and moisture
4. trigger `dry`, `deodorize`, or `clean` from the Flask dashboard
5. show automatic stop after threshold recovery or timeout
6. open the chamber during operation to prove the fault interlock works

## Week 9 Robustness Checklist

- optimized Python controller uses fixed thresholds and a small state machine
- non-blocking state machine is used instead of long delays
- each actuator has a defined runtime limit
- door switch acts as a safety interlock
- cooldown prevents rapid repeated cycles
- repeated faulty sensor readings trigger fault mode
- all high-current loads are isolated from ESP32 GPIO
- electronics remain outside the wet cleaning chamber

## Conclusion

The project is now aligned with the Week 9 requirement because the Python controller and Flask dashboard no longer describe only a concept. They define an implementable ESP32-based prototype with optimized sensor handling, controlled actuation, timeout-based protection, and concrete fail-safe behavior suitable for demonstration, testing, and documentation.
