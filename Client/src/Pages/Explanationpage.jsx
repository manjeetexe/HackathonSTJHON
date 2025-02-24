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
  const [solution, setSolution] = useState("No solution yet.");

  // Function to send problem to backend
  const handleSolveProblem = async () => {
    if (!problem.trim()) {
      console.log("Please enter a problem.");
      return;
    }

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
      console.log(data)
      setSolution(data.solution); // Update UI with the solution
      console.log("Solution:", data.solution); // Log solution in console

    } catch (error) {
      console.error("Error solving problem:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#010a0a] text-white p-6 flex justify-center items-center">
      <div className="max-w-7xl w-full space-y-6">
        <header className="flex items-center justify-between border-b border-[#02fdff] pb-4">
          <h1 className="text-3xl font-bold text-[#02fdff]">Math & Physics Solver</h1>
          <button className="bg-[#02fdff] text-black font-semibold px-5 py-2 rounded-lg hover:bg-[#02c7c7] transition">New Problem</button>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Problem Input and Solution */}
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
              >
                Solve
              </button>
            </div>

            {/* Display Solution */}
            <div className="bg-[#012f2f] border border-[#02fdff] h-193 text-black p-4 rounded-lg shadow">
              <h2 className="text-lg text-[#02fdff] font-semibold">Step-by-Step Solution</h2>
              <div className="mt-2 text-[#02fdff]">{solution}</div>
            </div>
          </div>

          {/* Right Side - Graph and Insights */}
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
                <Link to="/" className="relative bottom-7 -right-5">
                  <div className="h-40 absolute top-10 left-17 bg-[#02fdff] blur-[80px] w-40"></div>
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