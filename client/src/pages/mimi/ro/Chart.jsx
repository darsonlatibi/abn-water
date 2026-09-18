import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const Chart = ({ data }) => {
  const chartData = data
    ?.slice()
    .reverse()
    .map((item) => ({
      time: new Date(item.startTime).toLocaleTimeString(),
      ph: Number(item.ph_avg),
      tdsIn: Number(item.tdsIn_avg),
      tdsOut: Number(item.tdsOut_avg),
      pressure: Number(item.pressure_avg),
      flow: Number(item.flow_avg),
    }));
  return (
    <>
      <div className="card shadow">
        <div className="card-header">pH Trend</div>

        <div className="card-body">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Line type="monotone" dataKey="ph" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line type="monotone" dataKey="ph" name="pH" />

          <Line type="monotone" dataKey="tdsOut" name="TDS Out" />

          <Line type="monotone" dataKey="pressure" name="Pressure" />

          <Line type="monotone" dataKey="flow" name="Flow" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
