import React from 'react'
import Core from './Components/Core'

const App = () => {
  return (
    <>
    <div className="h-screen w-screen bg-gray-900 px-20 ">
      <div className="flex justify-between items-center">
      {/* <div className='flex justify-evenly h-screen flex-col gap-3'>
          <div className='bg-blue-400 h-45 w-80'></div>
          <div className='bg-blue-400 h-45 w-80'></div>
          <div className='bg-blue-400 h-45 w-80'></div>
        </div> */}
        
        <Core />


        {/* <div className='flex justify-evenly h-screen flex-col gap-3'>
          <div className='bg-blue-400 h-45 w-80'></div>
          <div className='bg-blue-400 h-45 w-80'></div>
          <div className='bg-blue-400 h-45 w-80'></div>
        </div> */}
     
      </div>
    </div>
  </>
  )
}

export default App