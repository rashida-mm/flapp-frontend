import React, { useContext } from 'react';
import Header from '../Components/Header';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../services/baseUrl';
import { Col, Row } from 'react-bootstrap';
import TravellerDer from '../Components/TravellerDer';
import { bookingResContext } from '../ContextAPI/ContextShare';

function Booking() {
  const location = useLocation();
  const { selectedFlight } = useContext(bookingResContext);

  //price calculation
  const calculateAdjustedPrice = (basePrice, classType) => {
    // Default to base price for unknown class types
    let adjustment = 0;
    const numericBasePrice = Number(basePrice?.replace(/,/g, '')) || 0;
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

  return (
    <div style={{ backgroundColor: '#E5EEF4' }}>
      <div className='container text-dark'>
        <Header />
        <div className="container bg-white shadow rounded-9 p-3 my-5">
          <Row>
            {selectedFlight ? (
              <div>
                <img width={'50px'} src={selectedFlight ? `${baseUrl}/uploads/${selectedFlight.airlineLogo}` : "null"} alt="" /> {selectedFlight.airline} <span className='mx-2 rounded-6 text-white bg-secondary p-1'>{selectedFlight.flightNumber}</span>
                <Row className='mt-2 align-items-center justify-content-center'>
                  <Col>
                    <h5>  {selectedFlight.departureAirport}</h5>
                  </Col>
                  <Col>
                    <h5><i className="fs-2 mx-4 text-primary fa-solid fa-plane"></i></h5>
                  </Col>
                  <Col>
                    <h5>  {selectedFlight.destinationAirport}</h5>
                  </Col>
                </Row>
                <Row className='fw-bolder fs-4'>
                  <Col>{selectedFlight.departureTime}</Col>
                  <Col>{selectedFlight.duration}</Col>
                  <Col>{selectedFlight.arrivalTime}</Col>
                  <Col className='text-success'>
                    ₹ {calculateAdjustedPrice(selectedFlight.price, selectedFlight.classType)} <span className='text-dark fs-6'>({selectedFlight.classType})</span> 
                    <p className='fs-6 text-dark'>/ <i className="fa-solid fa-user"></i> per adult</p>
                  </Col>
                </Row>
                <div>
                  <p>Layover - {selectedFlight.layover}</p>
                </div>
                <Row className='text-dark'>
                  <Col md="3">
                    <img width={'50px'} src="https://cdn-icons-png.flaticon.com/512/2118/2118864.png" alt="" /> BAGGAGE : ADULT
                  </Col>
                  <Col md="3" className='mt-2'>
                    CHECK IN
                    <p>30 Kgs (1 piece only)</p>
                  </Col>
                  <Col md="3" className='mt-1'>
                    CABIN
                    <p>7 Kgs (1 piece only)</p>
                  </Col>
                </Row>
                <div className='d-flex justify-content-between mx-3'>
                  <p className='fw-bolder text-danger'> <img width={'50px'} src="https://cdn-icons-png.flaticon.com/512/1046/1046839.png" alt="" />Free Meal !</p>
                </div>
              </div>
            ) : (
              <p>No flight available.</p>
            )}
          </Row>
        </div>
      </div>
      <TravellerDer
        adjustedPrice={selectedFlight ? calculateAdjustedPrice(selectedFlight.price, selectedFlight.classType) : 0}
      />         
    </div>
  );
}

export default Booking;
