import React, { useEffect, useState } from 'react'
import '../Components/Style.css'
import FlightSearch from '../Components/FlightSearch'
import {Col, Row} from 'react-bootstrap';
import video from '../Assets/clouds.mp4'
import plane from '../Assets/plane.png'
import paris from '../Assets/paris.jpg'
import dubai from '../Assets/dubai.jpg'
import ny from '../Assets/ny.jpg'
import Header from '../Components/Header';
import Footer from '../Components/Footer'
import window from '../Assets/window.jpg'
import window2 from '../Assets/window2.jpg'

function Home() {


  return (
    <div>
      <div className='container'> 
    <Header/>    

<div className="home flex container my-5 px-2">
  <div className="mainText mb-5">
<h2>Welcome to <span className='flap'>FlApp</span> - Your Ultimate Flight Booking Companion!</h2>
  </div>

  <div className='homeImages flex'>
    <div className='videoDiv'>
      <video  src={video} autoPlay muted loop className='w-75 video'></video>
    </div>
    <img src={plane} className='plane img-fluid' alt="" />
  </div>
</div>

<FlightSearch />

<section id='tips' >
  <div className='support container section'> 
<div className='sectionContainer '>
<div className='titleDiv'>
<small>Travel Tips</small>
<h2 className='my-3'>Plan yout travel with confidence</h2>
<p>Find help with the booking and travel plans, see what to expect along the journey!</p>

</div>
<div className='infoDiv grid'>
<Row>
  <Col sm={12} md={6}>
  <div className='textDiv grid'>

<div className='singleInfo'>
<span className='number '>01</span>
<h4>Travel requirements for Dubai</h4>
<p>Find help with the booking and travel plans, see what to expect along the journey toyour favouirte destinations
</p>
</div>

<div className='singleInfo'>
<span className='number colorOne'>02</span>
<h4>Chauffer services at your arrival </h4>
<p>Find help with the booking and travel plans, see what to expect along the journey toyour favouirte destinations
</p>
</div>

<div className='singleInfo'>
<span className='number colorTwo'>03</span>
<h4>Multi-risk travel insurance</h4>
<p>Find help with the booking and travel plans, see what to expect along the journey toyour favouirte destinations
</p>
</div>

</div>
  </Col>
  <Col className='my-4 d-none d-md-block d-lg-block' >
  <div className='imgDiv'>
<div className="container1 ">
  <img className='image img-fluid' src={window} alt="" />
  <img className='overlay img-fluid' src="https://static.displate.com/857x1200/displate/2023-05-19/50a4a1c31a65036530d9f2725ec3d496_5bfc82a0096a84d5e959d85a9dc4b840.jpg" alt="" />
  <img className='overlay1 img-fluid' src={window2} alt="" />
</div>
</div>
  </Col>
</Row>

</div>
</div>
  </div>
</section>

<section id='top'>
<div className='travelers container section my-5'>
<div className='sectionContainer1'>
<h2 className='text-center my-5'>Top travel Destinations</h2>
<Row>
  <Col>
  <div class="card cards m-2 ">
  <div class="main-content">
    <img className='rounded' style={{width:'300px'}} src={paris} alt="" />
    <div className="hover-text fs-2">Paris</div>
  </div>
</div>
  </Col>
  <Col>
  <div class="card cards m-2">
  <div class="main-content">
    <img className='rounded' style={{width:'300px'}} src={dubai} alt="" />
    <div className="hover-text fs-2">Dubai</div>
  </div>
</div>
  </Col>
  <Col>
  <div class="card cards m-2">
  <div class="main-content">
    <img className='rounded' style={{width:'300px'}} src={ny} alt="" />
    <div className="hover-text fs-2">New York</div>
  </div>
</div>
  </Col>
</Row>
</div>
</div>
</section>

<section id='sub'>
<div className="container my-5 rounded-9">
<form className="form-1 p-3">
  <span className="title">Subscribe to our newsletter.</span>
  <div>
    <input className='form-control' placeholder="Enter your email" type="email" name="email" id="email-address"/>
    <button className='btn' type="submit">Subscribe</button>
  </div>
</form>
</div>

</section>

    </div>
    <Footer/>
    </div>
  )
}

export default Home