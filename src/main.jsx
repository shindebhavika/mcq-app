import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Quiz from './components/Quiz'
import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom'
import Submit from './components/Submit'
import Welcome from './components/Welcome'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/submit" element={<Submit />} />
      </Routes>
    </Router>
  
  </StrictMode>,
)
