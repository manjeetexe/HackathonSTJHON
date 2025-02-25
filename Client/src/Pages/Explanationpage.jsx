import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SpeakerSoundAnalizer from "./../Components/SpeakerSoundAnalizer";
import Core3 from "./../Components/Core3";
import { Link } from "react-router-dom";

const graphData = [
  { x: -5, y: 25 }, { x: -4, y: 16 }, { x: -3, y: 9 }, { x: -2, y: 4 },
  { x: -1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 },
  { x: 3, y: 9 }, { x: 4, y: 16 }, { x: 5, y: 25 },
];

export default function MathPhysicsSolver() {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showFullSolution, setShowFullSolution] = useState(false);

  const handleSolveProblem = async () => {
    if (!problem.trim()) {
      console.log("Please enter a problem.");
      return;
    }

    setLoading(true);
    setShowFullSolution(false);
    setCurrentStepIndex(0);

    try {
      const response = await fetch("http://localhost:8000/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch solution");
      }

      const data = await response.json();
      console.log(data);
      if (data.solution && typeof data.solution === "object") {
        setSolution(data.solution);
      } else {
        setSolution({});
      }
    } catch (error) {
      console.error("Error solving problem:", error);
      setSolution({});
    } finally {
      setLoading(false);
    }
  };

  const handleNewProblem = () => {
    setProblem("");
    setSolution({});
    setLoading(false);
    setCurrentStepIndex(0);
    setShowFullSolution(false);
  };

  const steps = Object.entries(solution);
  const currentStep = steps[currentStepIndex] || ["", "No solution available"];

  return (
    <div className="min-h-screen bg-[#010a0a] text-white p-6 flex justify-center items-center">
      <div className="max-w-7xl w-full space-y-6">
        <header className="flex items-center justify-between border-b border-[#02fdff] pb-4">
          <h1 className="text-3xl font-bold text-[#02fdff]">Math & Physics Solver</h1>
          <button 
            className="bg-[#02fdff] text-black font-semibold px-5 py-2 rounded-lg hover:bg-[#02c7c7] transition"
            onClick={handleNewProblem}
          >
            New Problem
          </button>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="border border-[#02fdff] text-black p-4 rounded-lg shadow bg-[#012f2f]">
              <h2 className="text-lg text-[#02fdff] font-semibold">Enter Your Problem</h2>
              <textarea
                placeholder="Type your math or physics problem here..."
                className="w-full mt-2 p-3 bg-[#024b4b] text-[#02fdff] rounded-lg resize-none outline-none focus:ring-2 focus:ring-[#02fdff]"
                rows="4"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              ></textarea>
              <button
                className="mt-3 text-black font-bold px-5 py-2 rounded-lg bg-[#02fdff] hover:bg-[#02c7c7] w-full transition"
                onClick={handleSolveProblem}
                disabled={loading}
              >
                {loading ? "Thinking..." : "Solve"}
              </button>
            </div>

            <div className="bg-[#012f2f] border border-[#02fdff] min-h-[200px] text-black p-4 rounded-lg shadow">
              <h2 className="text-3xl text-[#02fdff] font-semibold">Step-by-Step Solution</h2>
              <div className="mt-2 text-[#02fdff] whitespace-pre-line">
                {loading ? (
                  "Thinking..."
                ) : showFullSolution ? (
                  steps.map(([key, value], index) => (
                    <div key={index} className="mb-4">
                      <div className="text-3xl font-bold text-yellow-400">{key}</div>
                      <div className="text-xl text-[#02fdff] mt-1">{value}</div>
                    </div>
                  ))
                ) : (
                  <div>
                    <div className="text-3xl font-bold text-yellow-400">{currentStep[0]}</div>
                    <div className="text-xl text-[#02fdff] mt-1">{currentStep[1]}</div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  className="text-black font-bold px-4 py-2 rounded-lg bg-[#02fdff] hover:bg-[#02c7c7] transition disabled:opacity-50"
                  onClick={() => setCurrentStepIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentStepIndex === 0}
                >
                  Previous Step
                </button>

                <button
                  className="text-black font-bold px-4 py-2 rounded-lg bg-[#02fdff] hover:bg-[#02c7c7] transition disabled:opacity-50"
                  onClick={() => setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1))}
                  disabled={currentStepIndex === steps.length - 1}
                >
                  Next Step
                </button>
              </div>

              <button
                className="mt-4 w-full text-black font-bold px-4 py-2 rounded-lg bg-[#02fdff] hover:bg-[#02c7c7] transition"
                onClick={() => setShowFullSolution(!showFullSolution)}
              >
                {showFullSolution ? "Show Less Solution" : "Show Full Solution"}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="space-y-6 sticky top-5">
              <div className="bg-[#012f2f] border border-[#02fdff] text-[#02fdff] p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Graph Representation</h2>
                <div className="h-88">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#02fdff" />
                      <XAxis dataKey="x" stroke="#02fdff" />
                      <YAxis stroke="#02fdff" />
                      <Tooltip />
                      <Line type="monotone" dataKey="y" stroke="#02fdff" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex w-full justify-between ">
                <SpeakerSoundAnalizer />
                <Link to="/">
                  <Core3 />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
