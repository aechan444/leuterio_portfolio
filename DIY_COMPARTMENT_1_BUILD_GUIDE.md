# DIY Build Guide for Compartment 1

## Compartment 1 Role

Compartment 1 is the main prototype chamber. It acts as the:

- shoe entry point
- sensor reading area
- cleaning chamber
- drying chamber
- safety interlocked enclosure

This updated guide completes the Week 9 mechanical requirement by adding stability, mounting, enclosure, maintenance details, and support for a Thonny-loaded MicroPython controller with a Flask dashboard.

## Functional Goal

Compartment 1 should:

1. accept one shoe in a fixed and repeatable position
2. confirm shoe presence with a sensor
3. keep electronics protected from spray and moisture
4. support odor, humidity, and moisture sensing
5. allow controlled spray, brushing, and drying
6. remain stable during vibration from the motor and fan

## Recommended Chamber Size

Suggested internal dimensions for one shoe:

- width: `22 cm`
- height: `22 cm`
- depth: `35 cm`

Increase width slightly if the target includes bulky sneakers or boots.

## Recommended Build Approach

Use a fixed chamber with a separate dry electronics box.

Why this is the best prototype approach:

- easier to build with common materials
- easier to wire safely
- easier to clean and maintain
- more stable than a moving shoe-transfer mechanism

## Materials

### Structure

- plywood, MDF, or acrylic sheet
- clear acrylic front window
- L-brackets
- screws and washers
- hinges
- rubber feet
- EVA foam or rubber mat
- removable tray for dirt and liquid
- silicone sealant for splash-prone joints

### Mechanical Components

- soft nylon cylindrical brush
- 12V geared motor
- motor bracket
- shaft coupler
- brush supports or bearing blocks
- optional spring-loaded bracket for brush pressure control

### Cleaning and Drying

- 12V mini pump
- tubing
- fine spray nozzle
- foam or cleaning solution container
- 12V fan or blower

### Electronics

- ESP32
- MQ-135
- DHT22
- moisture sensor
- IR shoe sensor
- door switch
- optional dust sensor
- relay or MOSFET driver stage
- external 12V power supply

## Required Tools

- drill
- screwdriver
- soldering iron
- glue gun
- saw
- pliers
- utility knife
- measuring tape
- ruler
- sandpaper

## Chamber Layout

```text
Front Door
  ->
Shoe Position Base
  ->
Sensor Zone
  ->
Spray Zone
  ->
Brush Zone
  ->
Drying Zone
```

## Step-by-Step Build

### Step 1: Build a Rigid Box Frame

Build the chamber walls using MDF, plywood, or acrylic with corner reinforcement.

Use:

- screws for the main structure
- L-brackets in all main corners
- glue only as a secondary support, not the main structural support

Week 9 improvement:

- avoid foam-board-only construction for the final prototype
- use a stiffer frame so the webcam, sensors, and brush stay aligned

### Step 2: Add a Hinged Front Door

Use a hinged front door with a clear acrylic viewing window.

Add:

- a latch or magnetic catch
- rubber padding so the door closes firmly
- a door switch or magnetic reed sensor for interlock detection

This supports the MicroPython fail-safe that stops operation when the chamber is opened.

### Step 3: Install the Shoe Positioning Base

Build a flat base with:

- side guides
- a back stopper
- rubber surface or EVA foam

The shoe base must prevent the shoe from shifting while the brush and fan run.

Week 9 improvement:

- screw the base to the frame
- do not leave it loose on the chamber floor

### Step 4: Add a Removable Dirt and Liquid Tray

Place a removable tray below the shoe base or under the chamber floor opening.

The tray should collect:

- sprayed residue
- loosened dirt
- moisture drips

Week 9 improvement:

- make the tray easy to remove without touching electronics or wiring

### Step 5: Mount Sensors on Fixed Brackets

Mount each sensor on a rigid bracket or panel.

Recommended placement:

- MQ-135 on the upper side wall, outside direct spray line
- DHT22 on a dry side wall with airflow exposure
- moisture sensor near the drip area or damp base area
- IR sensor at the entrance or side wall to confirm shoe presence
- door switch at the door frame

Week 9 improvement:

- never leave sensors hanging by wires
- use screws, printed brackets, or acrylic mounts

### Step 6: Install the Spray System

Mount the nozzle so it aims at the upper and side surface of the shoe.

Important:

- use short spray bursts only
- keep tubing clipped to the wall
- keep the reservoir and pump outside the main splash zone

Week 9 improvement:

- add a drip loop in the tubing so liquid does not travel toward electronics

### Step 7: Install the Brush Assembly

Mount the brush and motor using a rigid bracket.

The brush should:

- rotate smoothly
- lightly contact the shoe
- avoid excessive pressure

Week 9 improvement:

- use a spring-loaded or adjustable mount for the brush
- add side supports or bearings so the shaft does not wobble
- add a splash guard around the brush area

### Step 8: Install the Fan or Blower

Mount the fan at the back or upper rear area of the chamber.

Best practice:

- direct airflow across the shoe surface
- add exhaust vents opposite the airflow path

Week 9 improvement:

- use screws and rubber washers to reduce vibration and noise
- add a grille to protect moving fan blades

### Step 9: Build a Separate Electronics Box

Place the ESP32, relay modules, and power distribution in a dry box outside the chamber.

This dry box should contain:

- ESP32
- relay or MOSFET stage
- power terminals
- fuse
- cable routing points

Week 9 improvement:

- use standoffs for boards
- label all terminals
- add strain relief where cables enter the box

### Step 10: Route and Secure Wiring

Route wires in two groups:

- low-voltage sensor wires
- higher-current fan, pump, and motor wires

Week 9 improvement:

- use cable ties and adhesive mounts
- keep moving parts away from wiring
- avoid loose breadboard jumpers in the final demo unit
- use heat-shrink and terminal blocks where possible

### Step 11: Match the MicroPython Pinout

Use the same pin mapping as `main.py`:

```text
GPIO4  <- DHT22
GPIO34 <- MQ-135 AO
GPIO35 <- Moisture AO
GPIO32 <- Dust VO
GPIO25 -> Dust LED control
GPIO27 <- IR sensor
GPIO26 <- Door switch
GPIO18 -> Fan relay
GPIO19 -> Pump relay
GPIO23 -> Brush relay
GPIO5  -> Buzzer
GPIO2  -> Status LED
```

### Step 12: Test in Stages

Test the chamber in this order:

1. verify shoe positioning and door closure
2. verify sensor values in Thonny shell or the Flask dashboard
3. verify fan output only
4. verify pump burst only
5. verify brush motor only
6. verify full cycle with the shoe fixed in place
7. open the door during operation to confirm the fail-safe response

## Mechanical Stability Improvements for Week 9

- use brackets on all major wall joints
- anchor the brush motor to a rigid panel
- use rubber feet under the whole chamber
- secure the fan with anti-vibration washers
- use a latched door to stop rattling
- clamp all tubing and cables
- keep the center of gravity low by placing heavy parts at the bottom

## Robustness Checklist

- chamber frame is rigid and square
- shoe base does not slide
- door closes firmly and triggers the switch reliably
- brush has controlled pressure and no shaft wobble
- fan is mounted with vibration control
- tubing cannot leak onto electronics
- sensors are mounted on brackets, not by loose wires
- electronics box is dry, enclosed, and strain-relieved
- tray is removable for cleaning
- all serviceable parts are accessible without dismantling the whole chamber

## Suggested Demo Operation Sequence

```text
1. Insert shoe
2. Close door
3. IR sensor confirms presence
4. ESP32 reads odor, humidity, and moisture
5. System selects monitoring, drying, deodorizing, or cleaning
6. Outputs run within timed limits
7. If the door opens, the system enters fault mode
8. After cycle completion, remove shoe and clean the tray if needed
```

## Conclusion

Compartment 1 is now documented as a stable prototype chamber rather than just a conceptual box. The updated build guide supports the MicroPython fail-safes, improves vibration resistance, protects the electronics from moisture, and gives you a cleaner explanation for the Week 9 requirement on mechanical stability and robustness enhancement.
