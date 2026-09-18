import React, { useState } from "react";

const RoPID = () => {
  const [pid, setPid] = useState({
    kp: 2.5,
    ki: 0.8,
    kd: 0.3,
    setpoint: 7.2,
    processValue: 7.15,
    output: 62,
  });

  return (
    <div className="container-fluid py-3">
      <h2 className="mb-4">RO PID Controller</h2>

      <div className="row">
        {/* PID SETTING */}

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header">PID Parameter</div>

            <div className="card-body">
              <div className="mb-3">
                <label>Kp</label>
                <input className="form-control" value={pid.kp} readOnly />
              </div>

              <div className="mb-3">
                <label>Ki</label>
                <input className="form-control" value={pid.ki} readOnly />
              </div>

              <div className="mb-3">
                <label>Kd</label>
                <input className="form-control" value={pid.kd} readOnly />
              </div>
            </div>
          </div>
        </div>

        {/* PROCESS */}

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header">Process Control</div>

            <div className="card-body">
              <h4>Set Point</h4>

              <h1 className="text-primary">{pid.setpoint}</h1>

              <hr />

              <h4>Process Value</h4>

              <h1 className="text-success">{pid.processValue}</h1>
            </div>
          </div>
        </div>

        {/* OUTPUT */}

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header">Controller Output</div>

            <div className="card-body text-center">
              <h1 className="display-4">{pid.output}%</h1>

              <div className="progress" style={{ height: "30px" }}>
                <div
                  className="progress-bar"
                  style={{
                    width: `${pid.output}%`,
                  }}
                >
                  {pid.output}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATUS */}

      <div className="card mt-4 shadow">
        <div className="card-header">System Status</div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <h6>Pressure</h6>
              <h4>12 Bar</h4>
            </div>

            <div className="col-md-3">
              <h6>Flow Rate</h6>
              <h4>120 L/H</h4>
            </div>

            <div className="col-md-3">
              <h6>Tank Level</h6>
              <h4>85%</h4>
            </div>

            <div className="col-md-3">
              <h6>Pump Status</h6>
              <h4 className="text-success">RUNNING</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoPID;
