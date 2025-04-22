import React from "react"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}  ></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
      </Routes>
    </Router>
  )
}

export default App
