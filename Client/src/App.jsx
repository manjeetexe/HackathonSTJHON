import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './Pages/Main'
import Canvas from './Pages/Canvas'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Canvas" element={<Canvas />} />
        
      </Routes>
    </Router>
  )
}

export default App