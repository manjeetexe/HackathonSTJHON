import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SpeakerSoundAnalizer from './../Components/SpeakerSoundAnalizer'
import Core3 from './../Components/Core3'
import { Link } from "react-router-dom";






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

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-600 pb-4">
          <h1 className="text-3xl font-bold">Math & Physics Solver</h1>
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300">New Problem</button>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Problem Input and Solution */}
          <div className="space-y-4">
            <div className=" border border-[#02fdff] text-black p-4 rounded shadow">
              <h2 className="text-lg text-[#02fdff] font-semibold">Enter Your Problem</h2>
              <textarea
                placeholder="Type your math or physics problem here..."
                className="w-full mt-2 p-2 bg-[#036363] text-[#02fdff] rounded resize-none"
                rows="4"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              ></textarea>
              <button className="mt-2  text-black font-black px-4 py-2 rounded bg-[#02fdff] hover:bg-[#02ffffd8] w-full">Solve</button>
            </div>


            <div className="bg-[#036363] text-black p-4 rounded shadow">
              <h2 className="text-lg text-[#02fdff] font-semibold">Insights</h2>
              <ul className="text-[#02fdff] list-disc pl-4">
                <li>Step-by-step breakdown of the problem.</li>
                <li>Graph for better understanding.</li>
                <li>Supports math and physics problems.</li>
              </ul>
            </div>

            <div className="bg-[#036363] text-black p-4 rounded shadow">
              <h2 className="text-lg text-[#02fdff] font-semibold">Step-by-Step Solution</h2>
              <div className="mt-2 text-[#02fdff]">
                {/* Solution steps will be displayed dynamically */}
                No solution yet.
              </div>
            </div>
          </div>

          {/* Right Side - Graph and Insights */}
          <div className="space-y-6">
            <div className="bg-[#0363638f] text-[#02fdff] p-4 rounded shadow">
              <h2 className="text-lg font-semibold">Graph Representation</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                    <XAxis dataKey="x" stroke="#02fdff" />
                    <YAxis stroke="#02fdff" />
                    <Tooltip />
                    <Line type="monotone" dataKey="y" stroke="#02fdff" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            
            <div className="flex w-full justify-between items-center">
                

                <SpeakerSoundAnalizer />

                <Link to='/' className="relative ">
                  <div className="h-40 absolute top-20 left-17 bg-[#02fdff] blur-[80px] w-40"></div>
                      <Core3 />
                </Link>

            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}