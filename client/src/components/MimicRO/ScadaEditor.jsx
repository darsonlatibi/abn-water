import React from "react";
import { useScadaStore } from "../../features/mimic/scadaStore";
import Tank from "./Tank";
import Pump from "./Pump";
import Valve from "./Valve";

import NodeWrapper from "./NodeWrapper";
import { PipeRenderer } from "./PipeRenderer";

const map = {
  tank: Tank,
  pump: Pump,
  valve: Valve,
};

const ScadaEditor = () => {
  const nodes = useScadaStore((s) => s.nodes);
  const mode = useScadaStore((s) => s.mode);
  const setMode = useScadaStore((s) => s.setMode);

  return (
    <div>
      {/* TOOLBAR */}
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setMode("edit")}>EDIT MODE</button>

        <button onClick={() => setMode("connect")}>CONNECT MODE</button>

        <span style={{ marginLeft: 20 }}>Mode: {mode}</span>
      </div>

      {/* CANVAS */}
      <svg width="100%" height="650" viewBox="0 0 1200 650">
        {/* PIPES */}
        <PipeRenderer />

        {/* NODES */}
        {nodes.map((node) => {
          const Component = map[node.type];
          if (!Component) return null;

          return (
            <NodeWrapper key={node.id} node={node}>
              <Component />
            </NodeWrapper>
          );
        })}
      </svg>
    </div>
  );
};

export default ScadaEditor;
