# DIY Build Guide for Compartment 1

## Project Context

This guide is for **Compartment 1**, which serves as the:

- entrance compartment
- scanning chamber
- cleaning chamber
- drying chamber

It is designed as a **DIY prototype** using low-cost materials and simple fabrication methods.

## Main Goal of Compartment 1

Compartment 1 should do the following:

1. receive the shoe
2. hold the shoe in a fixed position
3. capture an image using a webcam
4. detect visible dirt and shoe type
5. read odor, humidity, and moisture data
6. spray cleaning foam if needed
7. rotate a soft nylon roller brush
8. dry the shoe using a fan

## Recommended Prototype Concept

Use a **fixed cleaning chamber**.

This means:

- the shoe is inserted manually
- the shoe stays in one cleaning position
- the spray, brush, webcam, and fan are fixed in place
- the electronics are mounted in a separate dry section

This is the simplest and strongest design for prototyping.

## Recommended Size

Make the chamber large enough for one shoe.

Suggested dimensions:

- width: `22 cm`
- height: `22 cm`
- depth: `35 cm`

These dimensions can be adjusted depending on your shoe size target.

## DIY Materials

### Structure Materials

- plywood, MDF, or acrylic sheet
- illustration board or foam board for mock-up version
- clear acrylic sheet for viewing window
- L-brackets
- screws
- hot glue
- epoxy or strong adhesive
- hinges for front door
- rubber mat or EVA foam sheet
- removable plastic tray for dirt and liquid collection

### Mechanical Parts

- soft nylon roller brush
- `12V` DC geared motor
- motor bracket
- shaft coupler
- side supports for brush axle
- optional small springs for soft contact pressure

### Cleaning Parts

- mini `12V` pump or peristaltic pump
- flexible tubing
- spray nozzle or mist nozzle
- small liquid container for foam solution
- fan or blower fan

### Electronics

- ESP32
- webcam
- LED light strip or white LEDs
- MQ-135 gas sensor
- DHT22
- moisture sensor
- optional IR sensor
- relay module or MOSFET driver
- external `12V` power supply

## Required DIY Tools

- cutter or utility knife
- drill
- screwdriver
- ruler or tape measure
- soldering iron
- glue gun
- pliers
- saw for wood or acrylic
- sandpaper

## Internal Chamber Layout

The internal layout should follow this sequence:

```text
Front Door
   ->
Shoe Positioning Platform
   ->
Webcam + LED Scan Area
   ->
Foam Spray Zone
   ->
Nylon Roller Brush Zone
   ->
Fan Drying Zone
```

## Step-by-Step Build Guide

## Step 1: Build the Chamber Box

Create a rectangular box using plywood, MDF, acrylic, or foam board.

Panels needed:

- bottom panel
- top panel
- left wall
- right wall
- back wall
- front door or front opening cover

Suggested structure:

- use screws and L-brackets for wood
- use hot glue for temporary foam board prototype
- use acrylic glue for acrylic assembly

Important:

- the chamber must be enclosed
- leave access for wiring and maintenance
- include ventilation holes near the fan area

## Step 2: Add the Front Entrance Door

The front opening should allow easy shoe insertion.

Options:

- hinged front door
- sliding front panel
- open-front prototype with splash shield

Best option:

- hinged front door with transparent acrylic window

This lets you:

- observe the cleaning process
- reduce foam splash
- improve safety

## Step 3: Install the Shoe Positioning Base

Inside the chamber, install a flat base where the shoe will rest.

Use:

- thin plywood
- acrylic
- rubber mat on top

Add:

- side guides
- back stopper

Purpose:

- keeps the shoe centered
- ensures the webcam sees the shoe clearly
- keeps the brush contact point consistent

## Step 4: Add the Dirt and Liquid Collection Tray

Below or at the bottom of the chamber, place a removable tray.

Use:

- shallow plastic container
- metal tray
- acrylic tray

This tray collects:

- dust
- dirt
- excess foam
- moisture drips

This makes the chamber easier to clean after testing.

## Step 5: Mount the Webcam

Install the webcam at the top-front or upper-center of the chamber.

Best angle:

- facing downward toward the shoe
- slightly angled to capture the upper and side surface

Tips:

- use fixed mounting
- avoid shaky support
- keep the camera at the same distance every time

This improves:

- shoe type recognition
- dirt level detection
- before-and-after capture

## Step 6: Add LED Lighting

Install white LED lights near the webcam.

Place them:

- on the upper corners
- beside the webcam

Purpose:

- provides stable illumination
- reduces shadows
- improves AI image detection

Do not place the LEDs where the camera gets glare directly.

## Step 7: Install the Foam Spray System

Mount the spray nozzle on the upper side wall or top area.

Use:

- mini pump
- tubing
- nozzle
- small foam reservoir

The nozzle should aim at:

- the top and side surface of the shoe

Important design rule:

- spray only a small amount
- avoid soaking the shoe

Use short spray bursts.

## Step 8: Install the Nylon Roller Brush

Use a soft cylindrical nylon brush.

Mount it:

- horizontally near the side or upper part of the shoe
- connected to a DC geared motor

The brush should:

- lightly touch the shoe
- rotate without too much pressure

Best mounting methods:

- adjustable bracket
- spring-loaded mount

Why this matters:

- too much pressure can damage the shoe
- soft contact is safer for prototype testing

## Step 9: Install the Fan or Dryer

Mount the fan at the back or upper rear of the chamber.

Function:

- removes moisture
- helps dry foam residue
- improves air circulation

Add vent holes:

- opposite the fan
- near the top or side

If possible, direct airflow across the shoe surface instead of straight upward only.

## Step 10: Install the Sensors

### MQ-135

Place it:

- near the upper side wall or airflow path
- away from direct foam spray

Purpose:

- detects odor-related gases after shoe insertion

### DHT22

Place it:

- on a dry side wall
- away from the spray nozzle

Purpose:

- measures humidity and temperature in the chamber

### Moisture Sensor

Place it:

- near the base
- under the shoe platform
- or in the drip area if used as dampness indicator

Purpose:

- detects wet conditions

### Optional IR Sensor

Place it:

- near the entrance or side wall

Purpose:

- confirms shoe presence

## Step 11: Separate the Electronics Box

Do not place the ESP32, relay modules, and main wiring inside the wet area.

Create a separate electronics section:

- beside the chamber
- above the chamber
- or at the back in an enclosed dry box

This dry box should contain:

- ESP32
- relay module
- MOSFET driver
- power supply connections
- cable management

This is important for safety and maintenance.

## Step 12: Wire the Components

Suggested basic wiring:

```text
ESP32 GPIO34 <- MQ-135 AO
ESP32 GPIO4  <- DHT22 DATA
ESP32 GPIO35 <- Moisture Sensor AO
ESP32 GPIO18 -> Relay/Fan
ESP32 GPIO19 -> Pump/Relay
ESP32 GPIO23 -> Brush Motor Driver
ESP32 GPIO27 -> Optional IR Sensor
```

Use:

- relay or MOSFET for fan
- relay or MOSFET for pump
- motor driver or transistor stage for the brush motor

## Step 13: Program the Operation Sequence

The chamber should operate like this:

```text
1. detect shoe presence
2. capture image from webcam
3. analyze shoe type and dirt level
4. read MQ-135, DHT22, and moisture sensor
5. choose cleaning mode
6. activate spray if needed
7. activate roller brush if needed
8. activate fan if needed
9. stop all outputs
10. mark cycle as complete
```

## Step 14: Start with Manual Shoe Handling

For the first prototype:

- let the user manually insert the shoe
- let the user manually remove the shoe after cleaning

This is acceptable for a prototype because it proves:

- AI detection
- sensor monitoring
- cleaning logic
- hardware actuation

Do not overcomplicate the first version with automatic transfer.

## Practical DIY Version to Build First

Start with this minimum version:

1. box chamber
2. webcam
3. LED light
4. MQ-135
5. DHT22
6. moisture sensor
7. mini pump with nozzle
8. soft nylon brush with motor
9. fan
10. ESP32 in separate dry box

This version is enough for demonstration.

## Safety Tips

- keep all high-current parts isolated
- do not expose electronics to foam or water
- use only low-voltage DC power in the chamber area
- add a splash shield around the brush
- test brush pressure before actual cleaning
- use safe cleaning solution
- make all removable parts easy to wash

## What to Prioritize in Prototyping

Focus on these first:

1. stable shoe positioning
2. clear webcam image
3. controlled spray output
4. gentle brush contact
5. safe wiring
6. repeatable cleaning cycle

## Simplified Prototype Diagram

```text
+--------------------------------------------------+
| Front Door with Acrylic Window                   |
|                                                  |
|   [Webcam]   [LED]                               |
|                                                  |
|      [Spray Nozzle]                              |
|                                                  |
|   +------------------------------------------+   |
|   |         Shoe Positioning Base            |   |
|   |   with side guides and back stopper      |   |
|   +------------------------------------------+   |
|                                                  |
|      [Nylon Roller Brush + Motor]                |
|                                                  |
|                          [Fan / Dryer]           |
|                                                  |
|      [Removable Dirt / Liquid Tray]              |
+--------------------------------------------------+

Electronics Box Outside Chamber:
- ESP32
- Relay/MOSFET
- Power supply
- Wiring terminals
```

## Conclusion

The best way to build Compartment 1 using prototyping and DIY tools is to keep the chamber fixed, simple, enclosed, and modular. The webcam, spray nozzle, roller brush, and fan should remain stationary, while the shoe is manually inserted into a guided position. This approach is affordable, practical, and strong enough for a prototype demonstration and thesis defense.
