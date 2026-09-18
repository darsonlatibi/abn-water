import RawProcess from "./sections/RawProccess";
export default function MimicProcess() {
  return (
    <div className="w-full min-h-screen bg-slate-900 overflow-auto">
      <div
        className="card-header d-flex align-items-center justify-content-between text-white"
        style={{
          background: "#1f2937",
          borderBottom: "3px solid #0dcaf0",
          minHeight: "56px",
        }}
      >
        <div style={{ width: 100 }}></div>

        {/* <h4 className="mb-0 fw-bold text-center flex-grow-1">
          {deviceId.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </h4>

        <div style={{ width: 100 }} className="text-end">
          <span className={`badge ${online ? "bg-success" : "bg-danger"}`}>
            {online ? "ONLINE" : "OFFLINE"}
          </span>
        </div> */}
      </div>
      <svg
        viewBox="0 0 1000 1500"
        width="100%"
        height="auto"
        className="block bg-black"
        preserveAspectRatio="xMidYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <RawProcess />
      </svg>
    </div>
  );
}
