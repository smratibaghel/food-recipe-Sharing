import React from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import AddRecipe from './components/AddRecipe'
import Saved from './components/Saved'
import Home from './components/Home'
import Profile from './components/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <>
      <Router>
         <Navbar />
        <Routes>
           <Route path='/' element={ <Home/>}/>
          <Route path='/login' element={ <Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/add' element={  <AddRecipe />}/>
           <Route path='/profile' element={ <Profile/>}/>
            <Route path='/saved' element={ <Saved/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
