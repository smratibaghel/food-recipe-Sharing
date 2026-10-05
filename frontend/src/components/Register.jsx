import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/App_Context';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AppContext);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, SetPassword] = useState("")

  const registerHandler = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    
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
    
    if (result.data.message !== "User already exist"){
      setTimeout(() => {
        navigate('/')
      }, 1500)
    }
  };
   
  return (
    <div>
      <div className="login-page">
        <ToastContainer />
        <div className="container" style={{
          'width': "500px"
        }}>
          <h2 className='text-center'>Register</h2>
          <form onSubmit={registerHandler}>
            <div className="mb-3">
              <label htmlFor="exampleName" className="form-label">Name</label>
              <input type="text"
                className="form-control"
                id="exampleName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                required
              />
            </div>

            <div className="container d-grid col-3">
              <button type="submit" className="btn btn-danger text-center my-3">Register</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
