import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './Pages/Main'
import Canvas from './Pages/Canvas'
import Explanationpage from './Pages/Explanationpage';
import Team from './Pages/Team'


const App = () => {
  return (
    <>
    
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Canvas" element={<Canvas />} />
            <Route path="/Explain" element={<Explanationpage />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </Router>
    </>
  )
}

export default App