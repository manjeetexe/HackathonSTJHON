import React from 'react'
import Core from './Components/Core'
import ChatBox from './Components/ChatBox'
import { motion } from "framer-motion";

const App = () => {
  return (
    <>
    <div className="h-screen w-screen bg-black  px-20 ">
    
      <div className="flex h-full w-full justify-between relative items-center">
      <div className='absolute bg-[#02fdff] h-100 w-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-[500px]'></div>
      
      <div className='flex justify-center gap-5 h-screen flex-col'>
      
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
                  className="h-10 bg-[#02fdff] rounded-sm shadow-[#02fdff]/50"
                  initial={{ width: "0%" }}
                  animate={{ width: "90%" }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                />
                
              </div>
           
            
          </div>
        
        
          <div className='bg-gray-900 rounded-md p-3 flex flex-col gap-2  h-60 w-80'>
            <div className='flex  gap-3'>
            <div className="h-20 w-[65%] border border-[#02fdff] rounded-sm bg-gray-900 relative grid-container">
            </div>
              <div className='h-20 w-[35%] bg-[#024a4a]'></div>
            </div>
            <div className='bg-[#02fdff] w-full h-10'></div>
            <div className='flex gap-3'>
            <div className='h-20 w-[40%] bg-[#024a4a]'></div>
              <div className='bg-black w-[60%] h-20'></div>
            </div>
          </div>
       
        
          <div className='bg-gray-900 rounded-md p-3 flex flex-col gap-2  h-60 w-80'>
            <div className='flex  gap-3'>
            <div className="h-20 w-[65%] border border-[#02fdff] rounded-sm bg-gray-900 relative grid-container">
            </div>
              <div className='h-20 w-[35%] bg-[#024a4a]'></div>
            </div>
            <div className='bg-[#02fdff] w-full h-10'></div>
            <div className='flex gap-3'>
            <div className='h-20 w-[40%] bg-[#024a4a]'></div>
              <div className='bg-black w-[60%] h-20'></div>
            </div>
          </div>
       
        </div>
        <div className='absolute  top-[34vh] z-10 -left-17'>
          <h1 className='absolute text-[#02fdff] hover:text-[#fffb00] left-129'>Instagram</h1>
          <h1 className=' absolute top-5 text-[#02fdff] hover:text-[#fffb00] left-126'>Instagram</h1>
          <h1 className='absolute  text-[#02fdff] top-10 hover:text-[#fffb00] left-124'>Instagram</h1>
          <h1 className=' absolute top-15 text-[#02fdff] hover:text-[#fffb00] left-122'>Instagram</h1>
          <h1 className='absolute text-[#02fdff] top-20 hover:text-[#fffb00]  left-120'>Instagram</h1>
          <h1 className=' absolute top-25 text-[#02fdff] hover:text-[#fffb00] left-120'>Instagram</h1>
        </div>
        <h1 className='text-2xl text-[#fffb00] z-10 hover:text-[#fffb00] absolute left-102'>Social</h1>
        <div className='absolute  z-10 hover:text-[#fffb00] bottom-[47vh] -left-15'>
          <h1 className='absolute text-[#02fdff] hover:text-[#fffb00]  left-118'>Instagram</h1>
          <h1 className=' absolute top-5 text-[#02fdff]  hover:text-[#fffb00] left-118'>Instagram</h1>
          <h1 className='absolute text-[#02fdff] top-10 hover:text-[#fffb00] left-119'>Instagram</h1>
          <h1 className=' absolute top-15 text-[#02fdff] hover:text-[#fffb00] left-122'>Instagram</h1>
          <h1 className='absolute text-[#02fdff] top-20 hover:text-[#fffb00] left-124'>Instagram</h1>
          <h1 className=' absolute top-25 text-[#02fdff] hover:text-[#fffb00] left-126'>Instagram</h1>
        </div>
        
        
        <Core />

        <div className='absolute   top-[34vh] z-10 right-247'>
          <h1 className='absolute -top-17 text-[#02fdff] hover:text-[#fffb00] left-104'>Temperature</h1>
          <h1 className='absolute -top-10 text-[#fffb00] hover:text-[#fffb00] left-113 text-3xl font-black'>34°C</h1>
          <h1 className='absolute text-[#02fdff] hover:text-[#fffb00] left-117'>Instagram</h1>
          <h1 className=' absolute top-5 text-[#02fdff] hover:text-[#fffb00] left-120'>Instagram</h1>
          <h1 className='absolute  text-[#02fdff] top-10 hover:text-[#fffb00] left-122'>Instagram</h1>
          <h1 className=' absolute top-15 text-[#02fdff] hover:text-[#fffb00] left-125'>Instagram</h1>
          <h1 className='absolute text-[#02fdff] top-20 hover:text-[#fffb00]  left-127'>Instagram</h1>
          <h1 className=' absolute top-25 text-[#02fdff] hover:text-[#fffb00] left-128'>Instagram</h1>
        </div>
        <h1 className='text-2xl text-[#fffb00] z-10 hover:text-[#fffb00] absolute right-103'>Social</h1>
        <div className='absolute  z-10 hover:text-[#fffb00] bottom-[47vh] right-247'>
          <h1 className='absolute text-[#02fdff] hover:text-[#fffb00]  left-128'>Instagram</h1>
          <h1 className=' absolute top-5 text-[#02fdff]  hover:text-[#fffb00] left-127'>Instagram</h1>
          <h1 className='absolute text-[#02fdff] top-10 hover:text-[#fffb00] left-125'>Instagram</h1>
          <h1 className=' absolute top-15 text-[#02fdff] hover:text-[#fffb00] left-122'>Instagram</h1>
          <h1 className='absolute text-[#02fdff] top-20 hover:text-[#fffb00] left-120'>Instagram</h1>
          <h1 className=' absolute top-25 text-[#02fdff] hover:text-[#fffb00] left-117'>Instagram</h1>
          <h1 className='absolute text-[#02fdff] top-30 hover:text-[#fffb00] left-115'>Instagram</h1>
          <h1 className=' absolute top-35 text-[#02fdff] hover:text-[#fffb00] left-110'>Instagram</h1>
          <h1 className='absolute text-[#02fdff] top-40 hover:text-[#fffb00] left-106'>Instagram</h1>
          <h1 className=' absolute top-45 text-[#02fdff] hover:text-[#fffb00] left-100'>Instagram</h1>
        </div>

        

        <div className='className="flex flex-col  justify-center items-center '>
        <div className='bg-gray-900 rounded-md p-3 flex flex-col gap-2 mb-5  h-60 w-80'>
            <div className='flex  gap-3'>
            <div className="h-20 w-[65%] border border-[#02fdff] rounded-sm bg-gray-900 relative grid-container">
            </div>
              <div className='h-20 w-[35%] bg-[#024a4a]'></div>
            </div>
            <div className='bg-[#02fdff] w-full h-10'></div>
            <div className='flex gap-3'>
            <div className='h-20 w-[40%] bg-[#024a4a]'></div>
              <div className='bg-black w-[60%] h-20'></div>
            </div>
          </div>
          <ChatBox />
        </div>
     
      </div>
    </div>
  </>
  )
}

export default App