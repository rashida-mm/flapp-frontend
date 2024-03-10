import React from 'react';
import { baseUrl } from '../services/baseUrl';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function FlightList({ flights }) {
  const navigate = useNavigate();

  const handleBookClick = (flight) => {
    navigate('/booking', { state: { flight } });
  };

  const calculateAdjustedPrice = (basePrice, classType) => {
    // Default to base price for unknown class types
    let adjustment = 0;

    const numericBasePrice = Number(basePrice.replace(/,/g, '')) || 0;
  
    // Adjust the price based on class type
    switch (classType) {
      case 'economy':
      adjustment = 0;
      break;
    case 'business':
      adjustment = 1000;
      break;
    case 'first class':
      adjustment = 2000;
      break;
      default:
        break;
    }
    const adjustedPrice = numericBasePrice + adjustment;
    return adjustedPrice;  
  };

  console.log(flights);
  return (
    <div>
      <div className="container bg-light border border-info rounded-9 p-3 my-5">
      <Row>
      {flights && flights.length > 0 ? (
        flights?.map((flight) => (
              <div>
              <img width={'50px'} src={flight? `${baseUrl}/uploads/${flight.airlineLogo}` : "null"} alt="" />               {flight.airline}
<Row className='mt-2'>
  <Col>
  <h5>  {flight.departureAirport}
</h5>
  </Col>
  <Col>
  <h5><i class="fs-2 text-primary mx-5 fa-solid fa-plane"></i></h5>
  </Col>
  <Col>
  <h5>  {flight.destinationAirport}
</h5>
  </Col>
  <Col>
  </Col>
</Row>
<Row className='fw-bolder fs-4'>
  <Col>
  {flight.departureTime}
  </Col>
  <Col>
  {flight.duration}
  </Col>
  <Col>
  {flight.arrivalTime}
  </Col>
  <Col className='text-success'>
  ₹ {calculateAdjustedPrice(flight.price, flight.classType)} <span className='text-dark fs-6'>({flight.classType})</span> 
   </Col>
</Row>
<div className='d-flex justify-content-between'>
<p>layover - {flight.layover}</p>
<button className='btn btn-info'
 onClick={() => handleBookClick(flight)}
 >View Details</button>
</div>
              </div>
          ))
      ) : (
        <p>No flights available.</p>
      )}
      </Row>
</div>
    </div>
  );
}

export default FlightList;
