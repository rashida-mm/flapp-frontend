import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../Assets/new.png'
import { loginAPI, registerAPI } from '../services/allAPI';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



function Auth({ register }) {
  const location = useLocation();
const navigate = useNavigate();
  const isRegisterForm = register ? true : false

  //state creation to hold values
  const [userData, setUserdata] = useState({
    name: "",
    email: "",
    password: ""
  })

  //registeration
  const registerData=async()=>{
    const {name,email,password} = userData
    if(!name || !email || !password){
      toast.info("Please enter Valid details !")
    }
    else{
      //do api call
      const result = await registerAPI(userData)
      console.log(result);
      if (result.status == 200) {
        // api call
        alert(`${result.data.message}`)
        location('/login')
      } else {
        alert(`${result.response.data}`)
      }
    }
  }

  //login function
  const loginData=async()=>{
    const {email,password} = userData
    if(!email || !password){
      toast.warning("Please enter the details !")
    }
    else{
      const result = await loginAPI(userData)
      console.log(result);
     if(result.status==200){
      alert("Login successfull - Welcome Back to FlApp !")
      //set user obj into session storage
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.user))
     sessionStorage.setItem("token", result.data.token)
     if (result.data.user.role === 'admin') {
      navigate('/profile');
    } else {
      const fromBooking = location.state?.fromBooking;
      if (fromBooking) {
        navigate('/booking');
      } else {
        // Navigate to the profile page for other cases
        navigate('/profile');
      }
    }
  }    
     else{
      toast.error("Please enter Valid details !")
    }
    }
  }

  return (
    <div >
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '100%', height: '640px' }}>
        <div className='container'>
          <div className="row">
            <div className="col">
            </div>
            <div className="col card1 p-4 rounded-5 shadow " style={{backgroundColor:'#1C4573'}} >
              {/* form */}
              <h3 className='text-center text-white name'>Flapp
                <img className='logo ms-1' src={logo} alt="" />
              </h3>
              <h5 className='text-center text-light m-3'>
                {
                  isRegisterForm ? 'Sign Up here' : 'Sign In here'
                }
              </h5>
              <form>
                {
                  isRegisterForm &&  //truthy operator
                  <input type="text" value={userData.name} onChange={e=>setUserdata({...userData,name:e.target.value})} className='form-control mb-3 rounded-5' placeholder='Name' />
                }
                <input type="email" value={userData.email} onChange={e=>setUserdata({...userData,email:e.target.value})}  className='form-control rounded-5 mb-3' placeholder='Email Address' />
                <input type="password" value={userData.password} onChange={e=>setUserdata({...userData,password:e.target.value})}  className='form-control rounded-5 mb-3' placeholder='Password' />
              </form>
              {
                isRegisterForm ?
                  <div className='text-center m-3'>
                    <button onClick={registerData} className='btn btn-success rounded-5'>Sign Up</button>
                    <Link to={'/login'} className='text-decoration-none'>
                      <p className='m-3 text-light'>Already a user? Please Sign In here</p>
                    </Link>
                  </div>
                  :
                  <div className='text-center m-3'>
                    <button onClick={loginData} className='btn btn-danger rounded-5'>Sign In</button>
                    <Link to={'/register'} className='text-decoration-none'>
                      <p className='m-3 text-light'>New user? Please Sign Up here</p>
                    </Link>
                  </div>
              }
            </div>
            <div className="col">
            </div>
          </div>

        </div>

      </div>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  )
}

export default Auth