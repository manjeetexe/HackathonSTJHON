import React from 'react'
import Core from './Components/Core'

const App = () => {
  return (
    <>
    <div className="h-screen w-screen bg-black  px-20 ">
    
      <div className="flex h-full w-full justify-between relative items-center">
      <div className='absolute bg-[#02fdff] h-100 w-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-[500px]'></div>
      
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