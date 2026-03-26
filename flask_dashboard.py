from datetime import datetime
from flask import Flask, jsonify, redirect, render_template, request, url_for


app = Flask(__name__)


state = {
    "command": "auto",
    "last_seen": None,
    "mode": "IDLE",
    "manual_mode": "auto",
    "status": {
        "device_id": "offline",
        "temperature_c": None,
        "humidity": None,
        "mq135": 0,
        "moisture": 0,
        "shoe_present": False,
        "door_closed": True,
        "wifi_connected": False,
        "fault": "Waiting for ESP32 update",
    },
}


@app.route("/")
def dashboard():
    return render_template("dashboard.html", state=state)


@app.post("/command")
def set_command():
    command = request.form.get("command", "auto").strip().lower()
    if command not in {"auto", "dry", "deodorize", "clean", "stop"}:
        command = "auto"
    state["command"] = command
    return redirect(url_for("dashboard"))


@app.post("/api/status")
def receive_status():
    payload = request.get_json(silent=True) or {}
    status = payload.get("status", {})

    state["last_seen"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    state["mode"] = payload.get("mode", state["mode"])
    state["manual_mode"] = payload.get("manual_mode", state["manual_mode"])
    state["status"].update(status)

    return jsonify({"command": state["command"]})


@app.get("/api/state")
def get_state():
    return jsonify(state)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
