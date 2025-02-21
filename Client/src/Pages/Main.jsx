import React, { useState } from 'react'
import Core from './../Components/Core'
import FuturisticChat from './../Components/ChatBox'
import Box1 from './../Components/Box1'
import HackerTerminal from './../Components/Hackingterminal'
import AudioVisualizer from './../Components/Audioanlize'
import SpeakerAudioAnalizer from './../Components/SpeakerSoundAnalizer'
import Button from './../Components/Button'
import { Link } from 'react-router-dom'
import Vocetotext from './../Components/VoicetoText'

const Main = () => {

  const [messages, setMessages] = useState([
    { text: "Hello, how can I assist you?", sender: "ai" }
  ]);

  // Function to send messages to the backend
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text, sender: "user" },
      { text: "Typing...", sender: "ai", temp: true }, 
    ]);

    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: text }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      // Remove "Typing..." and add AI's response
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.temp),
        { text: data.response, sender: "ai" }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.temp),
        { text: "Error: Unable to fetch response", sender: "ai" }
      ]);
    }
  };

  // Function to handle both text input and voice input
  const addMessage = (text) => {
    if (!text.trim()) return;
  
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    console.log(text)
    // Now call sendMessage to get AI response
    sendMessage(text);
  };


  return (
    <>
    <div className="h-screen w-screen bg-black  px-10 ">
    
      <div className="flex h-full w-full justify-between relative items-center">
      <div className='absolute bg-[#02fdff] h-100 w-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-[500px]'></div>
      
      <div className='flex justify-center gap-5 h-screen flex-col'>
      
          <div className='absolute p-3 flex justify-between items-center h-30 w-150 left-95 border top-12 border-[#02fdff]'>
              <div>
              <div className='flex justify-center items-center gap-2'>
                  <h1 className='text-4xl text-[#fffb00] font-bold'>25</h1>
                  <div className='flex text-[11px] flex-col text-[#fffb00]'>
                    <p>Febraury</p>
                    <p>2025</p>
                  </div>
              </div>
              <div className='text-[#02fdff]'>2:30:34 pm</div>
              </div>
              <div>
                <h1 className='text-[#fffb00] absolute top-6 left-[31%] font-black text-7xl'>ZENOX</h1>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='bg-[#02fdff] px-3 font-medium rounded-sm'>Log in</div>
                <div className='bg-[#02fdff] px-3 font-medium rounded-sm'>Sign up</div>
              </div>
          </div>

        <Box1 />

          
        
        
          <div className=''>
            <SpeakerAudioAnalizer />
          </div>
       
        
          <HackerTerminal />
       
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
        
        <div className='flex gap-5 absolute bottom-20 z-10 left-[30%]'>
        
        
        <Link to='/Canvas'>
          <Button Button='AI Black Board'  />
        </Link>

        <Vocetotext onVoiceInput={addMessage}/>
   

        <Button Button='Personal Agent'/>

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
        
          <div className='mb-4'>
          <AudioVisualizer />
          </div>
          
          <FuturisticChat messages={messages} setMessages={setMessages} sendMessage={sendMessage} />
        </div>
     
      </div>
    </div>
  </>
  )
}

export default Main