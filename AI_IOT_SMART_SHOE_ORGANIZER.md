# Design and Development of an AI-Driven IoT Smart Shoe Organizer with Automated Cleaning System for Personal Use Using the AIDUA Model

## Project Insight

This project is strong as a capstone, thesis, or prototype because it combines:

- IoT sensing and automation
- AI-assisted decision-making
- embedded systems control
- sanitation and shoe care
- mobile or web-based monitoring

The idea is practical. Many people store shoes without proper cleaning, drying, odor control, or usage tracking. A smart organizer can solve real problems:

- dust buildup
- bad odor
- moisture retention
- poor shoe organization
- unnecessary manual cleaning
- reduced shoe lifespan

The project becomes more valuable if it is framed as a **personal smart storage and maintenance system** rather than just a shoe rack.

## Core System Goal

The system should automatically:

1. detect shoe presence and organizer status
2. identify environmental conditions such as odor, humidity, and temperature
3. decide whether cleaning is needed
4. perform an automated cleaning cycle
5. notify the user through an app or dashboard
6. learn usage patterns for smarter maintenance scheduling

## What "AI-Driven" Should Mean

To keep the project credible, the AI part should do more than simple on/off control.

Possible AI functions:

- predict when a pair of shoes needs cleaning based on usage and sensor data
- classify odor or moisture severity
- recommend the best cleaning duration
- detect abnormal conditions such as high humidity or incomplete drying
- personalize cleaning schedules per user behavior

If the project is still at prototype level, the AI can be lightweight:

- rule-based intelligence first
- then a small predictive model later

That is often the best engineering path.

## Suggested Meaning of AIDUA Model

If your group is using **AIDUA** as a custom system model, a practical interpretation is:

- **A**: Acquisition
- **I**: Interpretation
- **D**: Decision
- **U**: Utilization
- **A**: Action

This is a clean way to describe how the system works.

## AIDUA System Workflow

### 1. Acquisition

The system collects data from sensors installed in the organizer.

Typical inputs:

- proximity or IR sensors for shoe slot occupancy
- load cells or pressure sensors for shoe presence
- humidity sensor
- temperature sensor
- gas sensor for odor detection
- dust sensor if included
- door or compartment open/close sensor

### 2. Interpretation

The controller processes the sensor readings and converts them into meaningful status data.

Examples:

- slot 3 contains shoes
- compartment humidity is high
- odor level exceeds threshold
- shoes were placed recently after outdoor use
- cleaning is recommended

### 3. Decision

The AI or decision engine determines the correct system response.

Examples:

- no action needed
- start drying only
- start brushing and air cleaning
- activate deodorizing cycle
- send maintenance notification

### 4. Utilization

The processed data is used by the mobile app, dashboard, or control panel.

The user can:

- view shoe slot status
- check cleaning history
- monitor odor and humidity levels
- receive alerts
- manually trigger cleaning
- set preferred cleaning modes

### 5. Action

The organizer executes the selected operation using actuators.

Possible outputs:

- mini fan for drying
- UV-C sterilization module
- soft rotating brush
- air blower
- deodorizer module
- motorized compartment or rack control
- indicator lights or buzzer

## How the IoT Smart Shoe Organizer Works

### Step 1: Shoe Placement

The user places shoes inside a compartment or rack slot.

Sensors detect:

- which slot is occupied
- whether the organizer door is closed
- initial temperature, humidity, and odor condition

### Step 2: Data Collection

The microcontroller reads all sensor data continuously or at scheduled intervals.

Recommended controller options:

- ESP32 for Wi-Fi and Bluetooth
- Raspberry Pi if image processing or heavier AI is needed
- Arduino with external communication module for simpler prototypes

### Step 3: Data Processing

The system checks:

- if the shoes are wet or likely damp
- if odor level is above the acceptable limit
- if cleaning was recently performed
- if the shoes have been stored too long without maintenance

### Step 4: AI or Smart Decision Layer

The AIDUA logic analyzes the collected data and chooses one of several modes:

- storage mode
- drying mode
- deodorizing mode
- cleaning mode
- sterilization mode
- alert mode

Example logic:

- high humidity + moderate odor = drying and deodorizing
- high odor + long storage duration = deodorizing + sterilization
- repeated use pattern every weekday = pre-scheduled maintenance suggestion

### Step 5: Automated Cleaning Cycle

When cleaning is triggered, the system may perform the following sequence:

1. close and secure the compartment
2. activate soft brush or dust-removal mechanism
3. run an air blower or fan
4. enable deodorizer or filtration system
5. activate UV-C sterilization for a controlled duration
6. stop all actuators and update system logs

### Step 6: User Notification

The system sends updates through an IoT dashboard or mobile app.

Possible notifications:

- cleaning started
- cleaning completed
- humidity too high
- odor detected
- UV cycle finished
- maintenance required

### Step 7: Learning and Optimization

Over time, the system can learn:

- which shoes are used most often
- how often cleaning is actually needed
- the best cleaning times
- how long drying usually takes

This is where the AI layer becomes more useful.

## Recommended Hardware Components

### Inputs

- ESP32 microcontroller
- DHT22 or SHT31 for temperature and humidity
- MQ-series gas sensor for odor approximation
- IR or ultrasonic sensors for slot detection
- reed switch or magnetic sensor for door status
- optional camera module for visual classification

### Outputs

- DC fans
- small servo or geared motor
- UV-C LED module
- relay module or MOSFET driver
- buzzer
- status LEDs
- optional OLED or LCD display

### Communication

- Wi-Fi via ESP32
- Bluetooth for local control
- MQTT or HTTP for cloud communication

## Recommended Software Stack

- Embedded firmware in C++ or MicroPython
- IoT dashboard using Blynk, Firebase, or a custom web app
- Database for sensor history
- Python model training if AI prediction is used
- Node-RED or MQTT broker for data orchestration

## Control Logic Example

```text
If slot_occupied = true
and humidity > threshold
then activate drying mode

If odor_level > threshold
then activate deodorizing mode

If humidity > threshold and odor_level > threshold
then run full cleaning cycle

If cleaning_count exceeds maintenance_limit
then notify user for manual inspection
```

## Possible AI Models

Depending on scope, the project can use:

- rule-based expert system for early prototype
- decision tree for cleaning recommendations
- logistic regression for cleaning-needed prediction
- random forest for multi-factor decision support
- lightweight neural network if enough training data exists

For a student prototype, a **decision tree or rule-based model** is usually the most realistic and defensible choice.

## System Architecture

```text
Sensors -> Microcontroller -> AIDUA Decision Engine -> Actuators
                          -> Cloud/Database -> Mobile App/Web Dashboard
```

## Key Features

- automatic shoe presence detection
- humidity and odor monitoring
- automated cleaning and drying
- smart deodorizing and sterilization
- remote monitoring through IoT
- cleaning logs and alerts
- AI-based cleaning recommendations

## Benefits

- improves hygiene
- reduces odor
- protects shoe quality
- saves user time
- supports organized storage
- introduces intelligent home automation

## Challenges

- odor sensing is approximate, not perfectly accurate
- UV-C use must be carefully enclosed for safety
- cleaning mechanisms must be gentle to avoid damaging shoes
- moisture removal may differ by shoe material
- AI performance depends on quality sensor data

## Safety Considerations

- fully enclose any UV-C module
- use timer-based safety interlocks
- prevent actuator operation while the door is open
- include overcurrent protection
- keep electrical parts isolated from moisture

## Recommended Scope for a Prototype

For a first working version, build these features first:

1. shoe detection
2. humidity and odor sensing
3. automatic fan-based drying
4. deodorizing cycle
5. mobile notification
6. basic rule-based AIDUA logic

Then add:

1. UV sterilization
2. brushing mechanism
3. predictive AI maintenance
4. usage analytics dashboard

## Short Evaluation

This is a good project if you present it as a **smart personal shoe care and storage system**. The strongest version is not just mechanical cleaning, but a full sensing-decision-action loop with clear IoT monitoring and a justified AI layer.

The project is feasible if you keep the first version focused and do not overpromise advanced AI too early.

## Suggested Thesis Statement Version

This study focuses on the design and development of an AI-driven IoT smart shoe organizer with an automated cleaning system for personal use. Using the AIDUA model, the system acquires environmental and usage data, interprets shoe storage conditions, makes intelligent maintenance decisions, utilizes cloud-connected monitoring, and performs automated cleaning and deodorizing actions to improve hygiene, convenience, and shoe preservation.

## Conclusion

Yes, this project is workable. The best approach is:

- build the IoT system first
- define the AIDUA workflow clearly
- use simple but defensible AI logic
- focus on hygiene, automation, and usability

If needed, this document can be expanded next into:

- Chapter 1 background and objectives
- conceptual framework
- block diagram
- methodology
- hardware and software requirements
- SOP and testing metrics
