import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <div className="nav bg-dark p-2">
        <div className="left">
          <h2>FoodBook </h2>
        </div>
        <div className="right">
          <Link to= {"/login"} className="btn btn-dark mx-2">Login </Link>
          <Link to= {"/register"} className="btn btn-dark mx-2">Register</Link>
          <Link to= {"/add"} className="btn btn-dark mx-2">Add</Link>
           <Link to= {"/profile"} className="btn btn-dark mx-2">Profile </Link>
          <Link to= {"/saved"} className="btn btn-dark mx-2">Saved</Link>
          <div className="btn btn-dark mx-2s">LogOut</div>

        </div>
      </div>
    </div>
  )
}

export default Navbar
