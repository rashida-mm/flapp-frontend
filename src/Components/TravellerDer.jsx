import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import '../Components/Style.css'
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Booking, bookingResContext } from '../ContextAPI/ContextShare';

// Define the LoginPromptModal component
const LoginPromptModal = ({ show, handleClose, handleLogin }) => {
  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
    <Modal.Header closeButton>
      <Modal.Title>Login required</Modal.Title>
    </Modal.Header>
    <Modal.Body>You must login to proceed !</Modal.Body>
    <Modal.Footer>
      
      <Button variant="success" onClick={handleLogin}>
        Ok
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

function TravellerDet({ adjustedPrice}) {
    
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);

  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  const { selectedFlight } = useContext(bookingResContext);

  const handleBookFlight = () => {
    const token = sessionStorage.getItem('token');

    if (token) {
      const totalPrice = calculateTotalPrice();
      const total = adultsCount + childrenCount + infantsCount;

      navigate('/payment', { state: { totalPrice, total, flight: selectedFlight } });
            console.log(totalPrice);
      console.log(total);
        } else {
      // Show the login prompt modal      
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLoginModal = () => {
    // Navigate to the login page
    navigate('/login');
  };

  const handleCountChange = (type, increment) => {
    switch (type) {
      case 'adults':
        setAdultsCount((prevCount) => Math.max(prevCount + increment, 0));
        break;
      case 'children':
        setChildrenCount((prevCount) => Math.max(prevCount + increment, 0));
        break;
      case 'infants':
        setInfantsCount((prevCount) => Math.max(prevCount + increment, 0));
        break;
      default:
        break;
    }

  };

  const total = adultsCount + childrenCount + infantsCount;
console.log(total);

const calculateTotalPrice = () => {
  const priceAdjustmentPerChild = adjustedPrice-500;

  const totalPrice =
    adultsCount * adjustedPrice +
    childrenCount * (priceAdjustmentPerChild) +
    infantsCount * 0; // No charge for infants

  return totalPrice;
};

  return (
    <div className='pb-5'>
      <Row className='w-100 px-5'>
        <Col>
        <div className="container p-4 text-dark bg-white rounded-9 shadow" style={{height:'270px'}}>
<h4 className="py-2 px-3 rounded-9" style={{backgroundColor:' #bad4f3'}}>Traveller Details</h4>
<Row className='my-3 text-center traveller'>
  <Col>
  <h6>Adults</h6>
  <p>(Aged 12+yrs)</p>
  <div className='d-flex fs-3 align-items-center justify-content-center'>
    <button onClick={() => handleCountChange('adults', -1)} className='btn text-success fs-3 shadow-0'>-</button>
    {adultsCount}
    <button onClick={() => handleCountChange('adults', 1)} className='btn text-success fs-3 shadow-0'>+</button>
  </div>
  </Col>
  <Col>
  <h6>Children</h6>
  <p>(Aged 2-12yrs)</p>
  <div className='d-flex fs-3 align-items-center justify-content-center'>
    <button onClick={() => handleCountChange('children', -1)}  className='btn text-success fs-3 shadow-0'>-</button>
    {childrenCount}
    <button onClick={() => handleCountChange('children', 1)} className='btn text-success fs-3 shadow-0'>+</button>
  </div>
  </Col>
  <Col>
  <h6>Infants</h6>
  <p>(Below 2yrs)</p>
  <div className='d-flex fs-3 align-items-center justify-content-center'>
    <button onClick={() => handleCountChange('infants', -1)} className='btn fs-3 text-success shadow-0'>-</button>
    {infantsCount}
    <button onClick={() => handleCountChange('infants', 1)} className='btn fs-3 text-success shadow-0'>+</button>
  </div>
  </Col>
</Row>
      </div>
        </Col>
        <Col>
        <div className="container p-4 text-dark bg-white rounded-9 shadow">
          <h4 className="py-2 px-3 rounded-9" style={{backgroundColor:' #bad4f3'}}>Fare Summary</h4>
    <h6 className='m-3 fw-bolder'>Base Fare</h6>
    <input type="text" className='form-control' value={`Adults (${adultsCount} x ${adjustedPrice}), Children (${childrenCount} x ₹${adjustedPrice - 500}) , Infants (${infantsCount} x ₹0) `} 
    />
          <h3 className='fw-bolder text-end m-4'>₹ {calculateTotalPrice()}
          <span className='mx-2'>
          <button onClick={handleBookFlight}  style={{border:'2px solid #FF6D38'}} className={`btn rounded-9 shadow ${total > 0 ? '' : 'disabled'}`}
                  disabled={total === 0}
>Book Flight</button>
  <LoginPromptModal show={showModal} handleClose={handleCloseModal} handleLogin={handleLoginModal} />
          </span>
          </h3>
          
        </div>
        </Col>
      </Row>
      
    </div>
  )
}

export default TravellerDet