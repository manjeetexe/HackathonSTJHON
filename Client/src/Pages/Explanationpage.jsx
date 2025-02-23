import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator, Info, Lightbulb, PlayCircle, RefreshCw, Sparkles, Type } from "lucide-react";

const graphData = [
  { x: -5, y: 25 },
  { x: -4, y: 16 },
  { x: -3, y: 9 },
  { x: -2, y: 4 },
  { x: -1, y: 1 },
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 16 },
  { x: 5, y: 25 },
];

export default function MathPhysicsSolver() {
  const [problem, setProblem] = useState("");
  const [activeTab, setActiveTab] = useState("graph");

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-white font-bold">Math & Physics AI Solver</h1>
          <button className="flex items-center gap-2 p-2 text-white border border-white rounded">
            <RefreshCw className="w-4 h-4 text-white" /> New Problem
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="p-4 border border-white rounded">
              <h2 className="text-xl  text-white font-semibold flex items-center gap-2">
                <Type className="w-5 h-5" /> Enter Your Problem
              </h2>
              <textarea
                placeholder="Enter your math or physics problem here..."
                className="w-full p-2 border border-white rounded"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
              <button className="w-full mt-2 p-2 bg-blue-500 text-white rounded flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Solve Problem
              </button>
            </div>

            <div className="p-4 border border-white rounded">
              <h2 className="text-xl text-white font-semibold flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-white" /> Step-by-Step Solution
              </h2>
              <div className="space-y-4"> {/* Solution steps here */} </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 border text-white border-white rounded">
              <h2 className="text-xl font-semibold flex items-center gap-2">Visualization</h2>
              <div className="flex gap-2 mt-2">
                <button className="p-2 border rounded" onClick={() => setActiveTab("graph")}>Graph</button>
                <button className="p-2 border rounded" onClick={() => setActiveTab("structure")}>Structure</button>
                <button className="p-2 border rounded" onClick={() => setActiveTab("calculator")}>Calculator</button>
              </div>
              <div className="mt-4 h-[400px] border rounded flex items-center justify-center">
                {activeTab === "graph" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" domain={[-5, 5]} type="number" />
                      <YAxis domain={[0, 25]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="y" stroke="#2563eb" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
                {activeTab === "structure" && <Info className="w-12 h-12 text-gray-400" />}
                {activeTab === "calculator" && <Calculator className="w-12 h-12 text-gray-400" />}
              </div>
            </div>

            <div className="p-4 border text-white  rounded">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> Key Insights
              </h2>
              <p className="text-gray-400">• The solution includes step-by-step breakdowns.</p>
              <p className="text-gray-400">• Graph and structure help visualize the problem.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
