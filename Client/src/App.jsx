import React from 'react'
import Core from './Components/Core'

const App = () => {
  return (
    <>
    <div className="h-screen w-screen bg-black  px-20 ">
    
      <div className="flex justify-between relative items-center">
      
      <div className='flex justify-evenly h-screen flex-col gap-3'>
          <div className='bg-blue-400 h-45 w-80'></div>
          <div className='bg-blue-400 h-45 w-80'></div>
         
          <div className='bg-blue-400 h-45 w-80'></div>
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

        

        <div className='flex justify-evenly h-screen flex-col gap-3'>
          <div className='bg-blue-400 h-45 w-80'></div>
          <div className='bg-blue-400 h-45 w-80'></div>
          <div className='bg-blue-400 h-45 w-80'></div>
        </div>
     
      </div>
    </div>
  </>
  )
}

export default App