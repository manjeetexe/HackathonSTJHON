import React from 'react'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Box1 = () => {
    const [progress, setProgress] = useState(0);
      const [direction, setDirection] = useState(1);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setProgress((oldProgress) => {
            let newProgress = oldProgress + direction * 2;
            if (newProgress >= 90) {
              setDirection(-1);
              newProgress = 90;
            } else if (newProgress <= 0) {
              setDirection(1);
              newProgress = 0;
            }
            return newProgress;
          });
        }, 30);
    
        return () => clearInterval(interval);
      }, [progress]);


  return (
    <>
        <div className='bg-gray-900 rounded-md p-3 flex flex-col gap-4  w-80'>
            <div className='flex  gap-3'>
            <div className="h-30 flex items-center justify-center w-[65%] border border-[#02fdff] rounded-sm bg-gray-900 relative grid-container">
            <div className="loader">
              <span></span>

              <div id="dot-1" className="dot"></div>
              <div id="dot-2" className="dot"></div>
              <div id="dot-3" className="dot"></div>
              <div id="dot-4" className="dot"></div>
              <div id="dot-5" className="dot"></div>
            </div>

            </div>
              <div className='h-30 w-[35%] p-2 bg-[#024a4a]'>
                  <div className='border text-[#02fdff] flex w-full justify-center  items-center border-[#02fdff] h-6'>CPU</div>
                  <div className='flex flex-col justify-center mt-2 items-center gap-1'>
                    <div className='flex text-sm text-[#fffb00] gap-3'>
                      <h1>TEMP</h1>
                      <h1>32°C</h1>
                    </div>
                    <div className='text-[#02fdff] text-sm flex gap-3'>
                      <h1>RAM</h1>
                      <h1>516GB</h1>
                    </div>
                    <div className='text-[#02fdff] text-sm flex gap-3'>
                      <h1>ROM</h1>
                      <h1>16GB</h1>
                    </div>
                  </div>
              </div>
            </div>

            
            <div className="w-full bg-cyan-900 rounded h-10 relative overflow-hidden">
        <motion.div
          className="h-10  bg-[#02fdff] rounded-sm shadow-[#02fdff]/50 flex items-center justify-center"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.03, ease: "linear" }}
        >
          <span className="absolute inset-0 flex mr-2 items-center justify-end text-white font-bold">{progress}%</span>
        </motion.div>
      </div>
           
          </div>
    </>
  )
}

export default Box1