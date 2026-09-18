import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { socket } from "../../lib/socket.js";

import {
  getRealtimeSensors,
  updateRealtimeSensor,
} from "../../features/ro/sensor_realtime_Slice.js";
import MimicRO from "./MimicRO";
import { RoContext } from "../../providers/RoContext.jsx";
const SensorRealTime = () => {
  const dispatch = useDispatch();

  const { sensors, loading } = useSelector((state) => state.sensorRealtime);

  // initial load dari DB
  useEffect(() => {
    dispatch(getRealtimeSensors());
  }, [dispatch]);

  // realtime socket
  useEffect(() => {
    socket.on("sensor:update", (data) => {
      console.log("REALTIME:", data);

      dispatch(updateRealtimeSensor(data));
    });

    return () => {
      socket.off("sensor:update");
    };
  }, [dispatch]);

  if (loading) {
    return <div>Loading sensor...</div>;
  }

  return (
    <>
      {sensors?.map((sensor) => (
        <div key={sensor.deviceId} className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-header">{sensor.deviceId}</div>

            <div className="card-body">
              <p>
                <strong>pH:</strong> {sensor.ph}
              </p>

              <p>
                <strong>TDS In:</strong> {sensor.tdsIn} ppm
              </p>

              <p>
                <strong>TDS Out:</strong> {sensor.tdsOut} ppm
              </p>

              <p>
                <strong>Pressure Feed:</strong> {sensor.pressureFeed} bar
              </p>

              <p>
                <strong>Pressure Membrane:</strong> {sensor.pressureMembrane}{" "}
                bar
              </p>

              <p>
                <strong>Tank Raw:</strong> {sensor.tankRaw}%
              </p>

              <p>
                <strong>Tank Product:</strong> {sensor.tankProduct}%
              </p>

              <p>
                <strong>Flow Rate:</strong> {sensor.flowRate} L/min
              </p>

              <p>
                <strong>Temperature:</strong> {sensor.temperature} °C
              </p>

              <p>
                <strong>Recovery Rate:</strong> {sensor.recoveryRate}%
              </p>

              <p>
                <strong>Rejection Rate:</strong> {sensor.rejectionRate}%
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    sensor.status === "NORMAL"
                      ? "bg-success"
                      : sensor.status === "WARNING"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                  }`}
                >
                  {sensor.status}
                </span>
              </p>

              <small className="text-muted">
                {new Date(sensor.updatedAt).toLocaleString()}
              </small>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SensorRealTime;
