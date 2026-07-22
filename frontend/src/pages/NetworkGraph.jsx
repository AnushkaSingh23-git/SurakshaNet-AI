import { useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  {
    id: "1",
    position: { x: 250, y: 20 },
    data: { label: "📱 Scam Phone" },
    style: {
      background: "#ef4444",
      color: "white",
      borderRadius: 10,
      padding: 10,
    },
  },
  {
    id: "2",
    position: { x: 70, y: 180 },
    data: { label: "🏦 Bank Account" },
    style: {
      background: "#2563eb",
      color: "white",
      borderRadius: 10,
      padding: 10,
    },
  },
  {
    id: "3",
    position: { x: 430, y: 180 },
    data: { label: "💳 UPI ID" },
    style: {
      background: "#16a34a",
      color: "white",
      borderRadius: 10,
      padding: 10,
    },
  },
  {
    id: "4",
    position: { x: 250, y: 340 },
    data: { label: "🌐 Fake Website" },
    style: {
      background: "#7c3aed",
      color: "white",
      borderRadius: 10,
      padding: 10,
    },
  },
  {
    id: "5",
    position: { x: 600, y: 340 },
    data: { label: "💬 WhatsApp" },
    style: {
      background: "#059669",
      color: "white",
      borderRadius: 10,
      padding: 10,
    },
  },
];

const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    animated: true,
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
  },
];

function NetworkGraph() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 ">
      <h1 className="text-4xl font-bold mb-8">
        🌐 Fraud Network Investigation
      </h1>

      <div className="bg-white rounded-xl shadow-xl h-[700px]">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default NetworkGraph;
