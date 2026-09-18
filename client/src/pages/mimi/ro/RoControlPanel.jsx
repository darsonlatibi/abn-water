import React, { useEffect, useState } from "react";
import ESP32 from "../../assets/ESP32.png";
import Panel1 from "../../assets/panel 1.png";
import Panel2 from "../../assets/panel 2.png";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../lib/socket.js";

import SensorRealTime from "./SensorRealTime.jsx";
import SensorAggregated from "./SensorAggregated.jsx";
import MimicRO from "./MimicRO.jsx";
import { RoContext } from "../../providers/RoContext.jsx";
import {
  getRealtimeSensors,
  updateRealtimeSensor,
} from "../../features/ro/sensor_realtime_Slice.js";
const RoControlPanel = () => {
  const { sensors, loading } = useSelector((state) => state.sensorRealtime);
  const sensor = sensors?.[0];
  console.log(sensor);
  const token = useSelector((state) => state.auth.accessToken);
  const [system, setSystem] = useState({
    feedPump: false,
    boosterPump: true,
    uv: true,
    ozone: false,
    autoMode: true,
  });
  const toggle = (key) => {
    setSystem((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">RO Control Panel</h2>
      <div className="row">
        {/* SENSOR */}
        <SensorRealTime />

        {/* CONTROL */}

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header">Equipment Control</div>

            <div className="card-body d-grid gap-2">
              <button
                className={`btn ${
                  system.feedPump ? "btn-success" : "btn-secondary"
                }`}
                onClick={() => toggle("feedPump")}
              >
                Feed Pump
              </button>

              <button
                className={`btn ${
                  system.boosterPump ? "btn-success" : "btn-secondary"
                }`}
                onClick={() => toggle("boosterPump")}
              >
                Booster Pump
              </button>

              <button
                className={`btn ${system.uv ? "btn-success" : "btn-secondary"}`}
                onClick={() => toggle("uv")}
              >
                UV Sterilizer
              </button>

              <button
                className={`btn ${
                  system.ozone ? "btn-success" : "btn-secondary"
                }`}
                onClick={() => toggle("ozone")}
              >
                Ozone Generator
              </button>
            </div>
          </div>
        </div>

        {/* AUTO MODE */}

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header">Automation</div>

            <div className="card-body">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={system.autoMode}
                  onChange={() => toggle("autoMode")}
                />

                <label className="form-check-label">Auto Mode</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sensor && <MimicRO {...sensor} />}

      <SensorAggregated />
      <div className="card mt-4">
        <div className="card-header">ESP32</div>

        <div className="card-body">
          <img src={ESP32} />
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-header">Panel 1</div>

        <div className="card-body">
          <img src={Panel1} />
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-header">Panel 2</div>

        <div className="card-body">
          <img src={Panel2} />
        </div>
      </div>
    </div>
  );
};

export default RoControlPanel;
