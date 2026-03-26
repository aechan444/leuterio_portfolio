# Smart Shoe Organizer

## Python Setup

- ESP32 controller: `main.py` using MicroPython in Thonny
- Laptop dashboard: `flask_dashboard.py`
- Flask template: `templates/dashboard.html`

## Quick Start

1. Flash MicroPython to the ESP32.
2. Open Thonny and save `main.py` to the ESP32 as `main.py`.
3. Edit Wi-Fi credentials and Flask server IP inside `main.py`.
4. Install Flask on the laptop with `pip install -r requirements-flask-dashboard.txt`.
5. Run `python flask_dashboard.py`.
6. Open `http://127.0.0.1:5000` in the browser.
