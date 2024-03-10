import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Admin from '../Components/Admin';
import User from '../Components/User';
import logo from '../Assets/mapp.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbarNav,
  MDBInputGroup
} from 'mdb-react-ui-kit';


function UserProfile() {

  const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);

  const existingUser = JSON.parse(sessionStorage.getItem('existingUser'))
  console.log(existingUser);
  
  const location = useNavigate()

  const logout=()=>{
    sessionStorage.clear();
  location('/')
  }
  
  return (
    <div >
      
      <div className="container">
      <MDBNavbar expand='lg' light bgColor='info' className='rounded-9 my-3'>
        <MDBContainer fluid>
          <MDBNavbarBrand className='name'>
            <img className='logo' src={logo} alt="" />
            FlApp</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavNoTogglerSecond(!openNavNoTogglerSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={openNavNoTogglerSecond}>
          <div className='ms-auto'>
          <MDBNavbarNav >
              <MDBNavbarItem>
                <MDBNavbarLink >
                  <button onClick={logout} className='btn btn-primary rounded-9'>Sign Out</button>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </div>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

          <h1 className='my-3 mx-5'>Welcome <span className='text-primary'>{existingUser.name}</span></h1>
          <div className='d-flex'>
       <label>
        <input style={{ display: 'none' }} type="file" />
        <img
          className='mx-5 my-3'
          width={'100px'}
          src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
          alt=""
        />
      </label>

        <div className='my-auto'>
        <input
          type="text"
          placeholder='Name'
          className='form-control rounded-5 mb-3'
          value={existingUser.name} // Assuming 'name' is part of the user object
          readOnly
        />
        <input
          type="text"
          placeholder='Email address'
          className='form-control rounded-5 mb-3'
          value={existingUser.email} // Assuming 'email' is part of the user object
          readOnly
        />
        </div>
      </div>
      
        {/* Conditionally render based on user's role */}
        {existingUser.role === 'admin' && (
         <Admin/>
        )}

        {existingUser.role === 'user' && (
          <User/>
        )}
      </div> 
      </div>
  );
}

export default UserProfile;
