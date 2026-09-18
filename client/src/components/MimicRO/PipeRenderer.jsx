import React from "react";
import { useScadaStore } from "../../features/mimic/scadaStore.js";
export const PipeRenderer = () => {
  const nodes = useScadaStore((s) => s.nodes);
  const edges = useScadaStore((s) => s.edges);

  const getNode = (id) => nodes.find((n) => n.id === id);

  return (
    <>
      {edges.map((edge, i) => {
        const from = getNode(edge.from);
        const to = getNode(edge.to);

        if (!from || !to) return null;

        const x1 = from.x + 50;
        const y1 = from.y + 50;
        const x2 = to.x + 50;
        const y2 = to.y + 50;

        const d = `M ${x1} ${y1} L ${x2} ${y2}`;

        return (
          <g key={i}>
            {/* PIPE BACKGROUND */}
            <path d={d} stroke="#444" strokeWidth="10" fill="none" />

            {/* FLOW */}
            <path
              d={d}
              stroke="#00bfff"
              strokeWidth="4"
              strokeDasharray="10 6"
              fill="none"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-30"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        );
      })}
    </>
  );
};
