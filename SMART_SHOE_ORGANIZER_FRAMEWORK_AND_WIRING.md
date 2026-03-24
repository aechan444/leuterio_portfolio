# Conceptual Framework and Hardware Wiring

## Project Title

Design and Development of an AI-Driven IoT Smart Shoe Organizer with Automated Cleaning System for Personal Use Using the AIDUA Model

## Conceptual Framework

The conceptual framework of the system is based on the relationship between **input, process, and output**, guided by the **AIDUA model**.

## AIDUA Model Structure

- **A - Acquisition**
  The system gathers real-time data from sensors installed inside the shoe organizer.
- **I - Interpretation**
  The microcontroller and decision logic interpret the collected sensor values.
- **D - Decision**
  The AI or rule-based engine decides whether to store, dry, deodorize, or clean the shoes.
- **U - Utilization**
  The interpreted data is displayed in the IoT app or dashboard for user monitoring.
- **A - Action**
  The system activates the correct actuators such as fan, deodorizer, or cleaning unit.

## Input-Process-Output Framework

### Input

The system receives data from the following components:

#### 🧪 Odor Sensor Components

- **MQ-135 Gas Sensor**
  Detects ammonia, alcohol, benzene, and other gases commonly associated with shoe odor.
  This is the recommended odor sensor for the project.

- **MQ-3 Gas Sensor**
  Detects alcohol-related gases and can support sweat-related odor monitoring.

- **MQ-2 Gas Sensor**
  Detects smoke and combustible gases. Less specific for odor, but still usable as an alternative.

### Recommended odor sensor

- **MQ-135**

#### 💧 Dirt / Condition Detection Components

- **DHT11 or DHT22**
  Measures temperature and humidity inside the organizer.
  High humidity indicates possible bacterial growth, odor buildup, or damp shoes.

- **GP2Y1010AU0F Dust Sensor**
  Optional component for detecting fine dust or particles inside the organizer.

- **Moisture Sensor**
  Can be repurposed to detect wet shoes or damp conditions.
  If moisture is detected, the system can trigger drying or cleaning mode.

#### Supporting Component

- **ESP32 Microcontroller**
  Reads sensor data, processes decision rules, and sends data to the cloud or mobile app.

## Process

The process stage includes the following:

1. the sensors collect odor, humidity, temperature, dust, and moisture data
2. the ESP32 reads and converts sensor signals into usable values
3. the AIDUA model interprets the condition inside the organizer
4. the AI or rule-based logic decides whether cleaning is required
5. the system sends the data to an IoT dashboard or mobile app
6. the system activates the needed cleaning or drying component

## Output

The system produces the following outputs:

- automated drying
- automated deodorizing
- cleaning activation
- app notification
- compartment status display
- cleaning history log
- smart maintenance recommendation

## Conceptual Paradigm

```text
INPUT
- MQ-135 gas sensor
- DHT11/DHT22
- Dust sensor
- Moisture sensor
- Shoe presence input

        ↓

PROCESS
- ESP32 data acquisition
- AIDUA interpretation
- AI/rule-based decision-making
- IoT cloud/app update

        ↓

OUTPUT
- Fan activation
- Deodorizer activation
- Cleaning cycle
- Drying cycle
- User notification
- Smart maintenance feedback
```

## Simplified Conceptual Explanation

The smart shoe organizer detects the internal condition of the stored shoes using odor, humidity, moisture, and optional dust sensors. The ESP32 processes the sensor readings and applies the AIDUA model to interpret the condition. Based on the result, the system decides whether the shoes only need storage, drying, deodorizing, or a full cleaning cycle. The results are then displayed in the IoT interface and the required actuator is activated automatically.

## Hardware Wiring Guide

This section uses the following core hardware:

- ESP32
- MQ-135 Gas Sensor
- DHT11 or DHT22
- Moisture Sensor
- GP2Y1010AU0F Dust Sensor
- fan or relay-controlled cleaning device

## Important Wiring Note

The ESP32 uses **3.3V logic**. Some sensors and modules may output **5V**, so voltage compatibility must be checked. If needed, use:

- voltage divider
- level shifter
- transistor driver
- relay module with proper isolation

## 1. ESP32 + MQ-135 Gas Sensor

### Purpose

Detects odor-related gases from shoes.

### Typical pins on MQ-135 module

- `VCC`
- `GND`
- `AO` analog output
- `DO` digital output

### Recommended connection

- `VCC` -> `VIN` or `5V` on ESP32 board if your board provides it
- `GND` -> `GND`
- `AO` -> ESP32 analog input pin such as `GPIO34`
- `DO` -> optional digital pin such as `GPIO27`

### Notes

- Use `AO` for better odor-level monitoring.
- The sensor requires preheating and calibration.
- If the analog output exceeds safe ESP32 voltage, add voltage protection.

## 2. ESP32 + DHT11 / DHT22

### Purpose

Measures humidity and temperature.

### Pins

- `VCC`
- `DATA`
- `GND`

### Recommended connection

- `VCC` -> `3.3V`
- `DATA` -> `GPIO4`
- `GND` -> `GND`

### Additional note

- Add a `10k ohm` pull-up resistor between `VCC` and `DATA` if the module does not already include one.
- `DHT22` is more accurate than `DHT11`.

## 3. ESP32 + Moisture Sensor

### Purpose

Detects wet shoes or damp surfaces.

### Typical pins

- `VCC`
- `GND`
- `AO`
- `DO`

### Recommended connection

- `VCC` -> `3.3V`
- `GND` -> `GND`
- `AO` -> `GPIO35`
- `DO` -> optional `GPIO26`

### Notes

- Analog reading is preferred for measuring moisture level.
- If metal-probe moisture sensors are used, corrosion may become an issue over time.

## 4. ESP32 + GP2Y1010AU0F Dust Sensor

### Purpose

Detects dust or fine particles inside the organizer.

### Basic connection

- `VLED` -> `5V`
- `LED-GND` -> `GND`
- `S-GND` -> `GND`
- `Vo` -> analog input such as `GPIO32`
- `VCC` -> `5V`
- `LED` control pin -> digital pin such as `GPIO25`

### Notes

- This sensor usually needs a resistor and capacitor based on the sensor datasheet.
- It is optional and should be treated as an advanced feature.

## 5. ESP32 + Fan / Cleaning Actuator

### Purpose

Activates drying or cleaning devices.

### Recommended method

Do not connect a fan or motor directly to the ESP32 pin. Use:

- relay module
- MOSFET driver
- transistor switch

### Example relay connection

- relay `IN` -> `GPIO18`
- relay `VCC` -> `5V`
- relay `GND` -> `GND`

Then connect:

- fan positive line through relay switching path
- fan power from external supply if needed

## 6. ESP32 + Buzzer or Status LED

### Purpose

Provides local alerts and system status.

### Buzzer

- positive -> `GPIO19`
- negative -> `GND`

### LED

- anode -> `GPIO23` through resistor
- cathode -> `GND`

## Suggested ESP32 Pin Assignment

```text
MQ-135 AO           -> GPIO34
MQ-135 DO           -> GPIO27
DHT11/DHT22 DATA    -> GPIO4
Moisture Sensor AO  -> GPIO35
Moisture Sensor DO  -> GPIO26
Dust Sensor Vo      -> GPIO32
Dust Sensor LED     -> GPIO25
Relay/Fan Control   -> GPIO18
Buzzer              -> GPIO19
Status LED          -> GPIO23
```

## Text-Based Hardware Block Diagram

```text
                +----------------------+
                |      MQ-135          |
                |  Odor Gas Sensor     |
                +----------+-----------+
                           |
                           v
                +----------------------+
                |        ESP32         |
                | Data + Decision Unit |
                +----+----+----+-------+
                     |    |    |
                     |    |    |
                     |    |    +-------------------+
                     |    |                        |
                     v    v                        v
            +------------+-----+        +------------------+
            | DHT11/DHT22      |        | Moisture Sensor  |
            | Temp/Humidity    |        | Wet Shoe Detect  |
            +------------------+        +------------------+
                     |
                     v
             +------------------+
             | Dust Sensor      |
             | Optional Input   |
             +------------------+

                     |
                     v
             +------------------+
             | IoT Dashboard    |
             | App / Cloud      |
             +------------------+

                     |
                     v
     +----------------+-------------------+
     |                                    |
     v                                    v
+------------+                      +-------------+
| Relay/Fan  |                      | Buzzer / LED|
| Dryer Unit |                      | Notifications|
+------------+                      +-------------+
```

## Wiring Summary Table

| Component | Pin | Connect To ESP32 |
|---|---|---|
| MQ-135 | AO | GPIO34 |
| MQ-135 | DO | GPIO27 |
| MQ-135 | VCC | 5V/VIN |
| MQ-135 | GND | GND |
| DHT22 | DATA | GPIO4 |
| DHT22 | VCC | 3.3V |
| DHT22 | GND | GND |
| Moisture Sensor | AO | GPIO35 |
| Moisture Sensor | DO | GPIO26 |
| Dust Sensor | Vo | GPIO32 |
| Dust Sensor | LED Control | GPIO25 |
| Relay Module | IN | GPIO18 |
| Buzzer | Signal | GPIO19 |
| Status LED | Signal | GPIO23 |

## Control Logic Example

```text
If MQ-135 value is high
and humidity is high
then activate deodorizing and drying

If moisture sensor detects wet shoes
then activate drying mode

If dust level is high
then suggest cleaning cycle

If all values are normal
then maintain storage mode
```

## Recommended Prototype Setup

For a practical first prototype, use:

1. ESP32
2. MQ-135
3. DHT22
4. Moisture sensor
5. relay-controlled fan
6. buzzer or LED indicator

Add the dust sensor later if needed.

## Conclusion

The conceptual framework shows that the smart shoe organizer works by collecting environmental and condition data, processing it through the AIDUA model, making intelligent cleaning decisions, and activating the proper response through connected actuators. The ESP32 acts as the main controller, while the MQ-135, DHT22, moisture sensor, and optional dust sensor provide the data needed for AI-assisted decision-making.
