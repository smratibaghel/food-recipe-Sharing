import React, { useContext, useState } from 'react'
import {AppContext} from '../context/App_Context'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate()
  const {login}=useContext(AppContext)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
  const loginHandler=async (e)=>{
    e.preventDefault();
    const result=await login(email,password);
    if(result.data.success){
    toast.success(result.data.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setTimeout(()=>{
      navigate('/')
    },1500)
  }
  else{
    toast.error(result.data.message,{
      position: "top-right",
      autoClose: 3000,
      theme: "light",
      transition: Bounce,
    })
  }

    // console.log("logged in",result.data)
  }
  return (
    <div className="login-page">
      <ToastContainer/>
      <div className="container" style={{
        'width':"500px"
      }}>
        <h2 className='text-center'>Login</h2>
        <form onSubmit={loginHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email 
            </label>
            <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email" 
            className="form-control" 
            id="exampleInputEmail1"
            required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
             value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password" 
            className="form-control" 
            id="exampleInputPassword1"
            required />
          </div>
          <div className="container d-grid col-3">
            <button type="submit" className="btn btn-danger text-center my-3">Login</button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default Login;
