import React from 'react'
import FlightList from '../Components/FlightList'
import { useLocation } from 'react-router-dom';
import FlightSearch from '../Components/FlightSearch';
import Header from '../Components/Header'

function Flights() {
  const location = useLocation();
  const filteredFlights = location.state?.flights;
  return (
    <div className='container'>
      <Header/>
      <FlightSearch/>
  <FlightList flights={filteredFlights} />
      </div>
  )
}

export default Flights
