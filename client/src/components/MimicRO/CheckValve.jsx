import React, { useEffect, useState } from "react";
import { socket } from "../../lib/socket"; // sesuaikan path kamu

const CheckValve = ({ valveId, label = "Check Valve" }) => {
  const [status, setStatus] = useState("UNKNOWN");
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (!socket) return;

    // listen event per valve
    const eventName = `valve:${valveId}`;

    const handleValveUpdate = (data) => {
      setStatus(data.status); // "OPEN" | "CLOSE"
      setLastUpdate(new Date());
    };

    socket.on(eventName, handleValveUpdate);

    // optional: request initial state
    socket.emit("valve:request", { valveId });

    return () => {
      socket.off(eventName, handleValveUpdate);
    };
  }, [valveId]);

  const getColor = () => {
    if (status === "OPEN") return "green";
    if (status === "CLOSE") return "red";
    return "gray";
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>{label}</div>

      <div style={{ ...styles.status, color: getColor() }}>{status}</div>

      <div style={styles.indicator}>
        <div
          style={{
            ...styles.dot,
            backgroundColor: getColor(),
          }}
        />
        <span style={styles.text}>
          {status === "OPEN"
            ? "Flow aktif"
            : status === "CLOSE"
              ? "Flow berhenti"
              : "No signal"}
        </span>
      </div>

      {lastUpdate && (
        <div style={styles.time}>
          Last update: {lastUpdate.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    padding: 16,
    borderRadius: 10,
    border: "1px solid #ddd",
    width: 220,
    fontFamily: "Arial",
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  status: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  indicator: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
  },
  text: {
    fontSize: 12,
  },
  time: {
    marginTop: 10,
    fontSize: 11,
    color: "#666",
  },
};

export default CheckValve;
