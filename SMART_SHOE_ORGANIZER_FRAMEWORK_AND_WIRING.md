# Conceptual Framework and Hardware Wiring

## Project Title

Design and Development of an AI-Driven IoT Smart Shoe Organizer with Automated Cleaning System for Personal Use Using the AIDUA Model

## Week 9 Objective

This document completes the hardware side of Week 9 by adding:

- stable pin mapping for the ESP32 firmware
- safer wiring practices for sensors and actuators
- electrical protection notes
- a mechanical and wiring robustness checklist

The wiring below matches `esp32_smart_shoe_organizer.ino`.

## Conceptual Framework

The system follows an input-process-output structure guided by the AIDUA model.

### Input

- MQ-135 gas sensor
- DHT22 temperature and humidity sensor
- moisture sensor
- optional dust sensor
- IR shoe presence sensor
- door limit switch

### Process

- ESP32 acquires and filters raw sensor readings
- rule-based decision logic interprets chamber condition
- safety checks verify sensor health and door status
- the controller selects idle, monitoring, drying, deodorizing, cleaning, or fault mode

### Output

- fan activation
- pump activation
- brush motor activation
- buzzer alarm
- status LED indication
- serial or future IoT status reporting

## AIDUA Mapping

- Acquisition: all sensors are sampled by the ESP32
- Interpretation: thresholds convert raw values into condition flags
- Decision: the controller selects the correct operating mode
- Utilization: the resulting status can be logged or displayed
- Action: relays or drivers energize the required outputs

## Recommended Final Hardware Set

### Core Controller

- ESP32 DevKit

### Sensors

- MQ-135 odor sensor module
- DHT22
- moisture sensor module
- IR obstacle sensor for shoe detection
- door switch or magnetic reed switch
- optional GP2Y1010AU0F dust sensor

### Actuators

- 12V DC fan or blower
- 12V mini pump
- 12V geared brush motor
- active buzzer
- status LED

### Driver and Protection Parts

- 3-channel relay board or separate MOSFET drivers
- flyback protection if using transistor or MOSFET stages
- fuse on the 12V input
- common ground between 12V supply and ESP32 logic
- terminal blocks or lever connectors
- heat-shrink tubing
- cable ties and cable clamps

## Important Power and Logic Notes

- The ESP32 uses 3.3V logic.
- Do not drive the fan, pump, or motor directly from ESP32 GPIO pins.
- Use relays or MOSFET drivers for all 12V loads.
- Keep wet-zone devices on a separate power path from the ESP32 logic supply.
- If an analog sensor module outputs more than 3.3V, add a voltage divider before the ESP32 ADC pin.

## ESP32 Pin Assignment

```text
DHT22 DATA          -> GPIO4
MQ-135 AO           -> GPIO34
Moisture AO         -> GPIO35
Dust Sensor VO      -> GPIO32
Dust LED Control    -> GPIO25
IR Shoe Sensor      -> GPIO27
Door Switch         -> GPIO26
Fan Relay           -> GPIO18
Pump Relay          -> GPIO19
Brush Relay         -> GPIO23
Buzzer              -> GPIO5
Status LED          -> GPIO2
```

## Detailed Wiring Guide

### 1. DHT22

- `VCC` -> `3.3V`
- `DATA` -> `GPIO4`
- `GND` -> `GND`
- Add a `10k` pull-up resistor from `DATA` to `3.3V` if your module does not already include one.

### 2. MQ-135

- `VCC` -> regulated `5V`
- `GND` -> `GND`
- `AO` -> `GPIO34` through a voltage divider if the module output can exceed `3.3V`

Notes:

- allow warm-up time before calibration
- mount away from direct spray path
- do not place it where foam can coat the sensing element

### 3. Moisture Sensor

- `VCC` -> `3.3V`
- `GND` -> `GND`
- `AO` -> `GPIO35`

Notes:

- if using a metal-probe sensor, place it in a drip or dampness detection point instead of direct constant contact with liquid
- capacitive moisture sensing is more durable than exposed resistive probes

### 4. IR Shoe Presence Sensor

- `VCC` -> `3.3V` or module-rated supply
- `GND` -> `GND`
- `OUT` -> `GPIO27`

Notes:

- mount where it confirms shoe insertion without seeing the brush or tray as a false target
- use a rigid bracket to preserve alignment

### 5. Door Switch

- one terminal -> `GPIO26`
- one terminal -> `GND`
- firmware uses `INPUT_PULLUP`, so the switch pulls the pin low when closed

Notes:

- a magnetic reed switch is easier to protect from moisture
- a mechanical limit switch gives clearer physical actuation

### 6. Dust Sensor

- `VCC` -> `5V`
- `GND` -> `GND`
- `VO` -> `GPIO32` with safe voltage verification
- LED control -> `GPIO25`

Notes:

- follow the sensor datasheet for resistor and capacitor requirements
- treat this as optional if your prototype needs fewer parts

### 7. Fan Relay

- relay `IN1` -> `GPIO18`
- relay `VCC` -> board-rated supply
- relay `GND` -> `GND`
- fan power path -> separate `12V` supply through relay contacts

### 8. Pump Relay

- relay `IN2` -> `GPIO19`
- relay `VCC` -> board-rated supply
- relay `GND` -> `GND`
- pump power path -> separate `12V` supply through relay contacts

### 9. Brush Motor Relay

- relay `IN3` -> `GPIO23`
- relay `VCC` -> board-rated supply
- relay `GND` -> `GND`
- motor power path -> separate `12V` supply through relay contacts

### 10. Buzzer and Status LED

- buzzer signal -> `GPIO5`
- buzzer ground -> `GND`
- LED anode -> `GPIO2` through a current-limiting resistor
- LED cathode -> `GND`

## Wiring Summary Table

| Component | Pin | ESP32 Connection |
|---|---|---|
| DHT22 | DATA | GPIO4 |
| MQ-135 | AO | GPIO34 |
| Moisture Sensor | AO | GPIO35 |
| Dust Sensor | VO | GPIO32 |
| Dust Sensor | LED | GPIO25 |
| IR Sensor | OUT | GPIO27 |
| Door Switch | Signal | GPIO26 |
| Fan Relay | IN | GPIO18 |
| Pump Relay | IN | GPIO19 |
| Brush Relay | IN | GPIO23 |
| Buzzer | Signal | GPIO5 |
| Status LED | Signal | GPIO2 |

## Text Block Diagram

```text
SENSORS
MQ-135
DHT22
Moisture
Dust
IR Presence
Door Switch

        |
        v

ESP32
Data Acquisition
Filtering
Rule-Based Decision
Safety Interlocks

        |
        v

DRIVERS
Relay / MOSFET Stage

        |
        v

OUTPUTS
Fan
Pump
Brush Motor
Buzzer
Status LED
```

## Electrical Hardening for Week 9

### Required Protections

- use a fused 12V input line
- separate low-current logic wiring from motor and pump wiring
- secure all joints with solder and heat-shrink or proper terminals
- route signal wires away from motor leads to reduce noise
- mount relays or drivers in the dry electronics box
- add strain relief where cables enter the enclosure

### Noise and Reliability Controls

- keep analog sensor wires short
- twist or bundle noisy motor wires separately
- share a solid common ground
- avoid loose jumper wires for final demo wiring
- use screw terminals, JST connectors, or Dupont housings with retention

## Mechanical Stability and Mounting Notes

- mount sensors on brackets, not on hanging wires
- secure relay boards and ESP32 to standoffs
- keep the electronics box outside the wet chamber
- add cable clamps so movement of the door or fan does not pull on solder joints
- keep the MQ-135 and DHT22 out of direct foam spray

## Week 9 Robustness Checklist

- pin assignments match the actual firmware
- no actuator is wired directly to the ESP32
- all 12V loads use relay or MOSFET isolation
- door switch is included for chamber interlock
- wiring is tied down and strain-relieved
- wet-zone and dry-zone electronics are physically separated
- analog outputs are checked for 3.3V compatibility
- fused supply and common grounding are provided

## Conclusion

The hardware framework is now aligned with the optimized ESP32 controller. The wiring plan supports safe operation, simpler debugging, and a more defensible prototype because it explicitly addresses electrical isolation, stable sensor mounting, and fail-safe chamber operation.
