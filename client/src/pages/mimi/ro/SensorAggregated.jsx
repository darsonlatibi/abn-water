import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAggregatedByPeriod,
  selectAggregatedDeviceData,
  selectAggregatedLoading,
} from "../../features/ro/sensor_agregated_Slice.js";
import { LineChart } from "recharts";
import Chart from "./Chart.jsx";

const SensorAggregated = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectAggregatedDeviceData);
  //   const chartData = data
  //     ?.slice()
  //     .reverse()
  //     .map((item) => ({
  //       time: new Date(item.startTime).toLocaleTimeString(),
  //       ph: item.ph_avg,
  //       tdsOut: item.tdsOut_avg,
  //       pressure: item.pressure_avg,
  //       flow: item.flow_avg,
  //     }));
  const loading = useSelector(selectAggregatedLoading);

  useEffect(() => {
    dispatch(
      getAggregatedByPeriod({
        deviceId: "RO_BARATA_1",
        period: "minute",
      }),
    );
  }, [dispatch]);

  if (loading) {
    return <div>Loading aggregated data...</div>;
  }

  return (
    <div className="card shadow">
      <div className="card-header">
        <strong>Sensor Aggregated</strong>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <Chart data={data} />
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th>Time</th>
                <th>pH Avg</th>
                <th>TDS In</th>
                <th>TDS Out</th>
                <th>Pressure Avg</th>
                <th>Flow Avg</th>
                <th>Min P</th>
                <th>Max P</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((row) => (
                <tr key={row.id}>
                  <td>{new Date(row.startTime).toLocaleString()}</td>

                  <td>{Number(row.ph_avg).toFixed(2)}</td>

                  <td>{Number(row.tdsIn_avg).toFixed(2)}</td>

                  <td>{Number(row.tdsOut_avg).toFixed(2)}</td>

                  <td>{Number(row.pressure_avg).toFixed(2)}</td>

                  <td>{Number(row.flow_avg).toFixed(2)}</td>

                  <td>{Number(row.min_pressure).toFixed(2)}</td>

                  <td>{Number(row.max_pressure).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2">
          Total Records: <strong>{data?.length || 0}</strong>
        </div>
      </div>
    </div>
  );
};

export default SensorAggregated;
