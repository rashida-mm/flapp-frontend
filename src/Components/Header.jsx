import React, { useState } from 'react';
import './Style.css';
import logo from '../Assets/mapp.png';
import { Link } from 'react-router-dom';
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

function Header() {
  const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);

  return (
    <div className='py-3'>
      <MDBNavbar expand='lg' light bgColor='info' className='rounded-9 '>
        <MDBContainer fluid>
          <MDBNavbarBrand className='name' href='/'>
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
              <MDBNavbarItem >
                <MDBNavbarLink active className='mt-1' aria-current='page' href='/'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#tips' className='mt-1'>Travel Tips</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink >
                  <Link to={'/login'}>
                  <button className='btn btn-primary rounded-9'>Sign In</button>
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </div>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default Header;