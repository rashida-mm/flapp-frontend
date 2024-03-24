import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../Components/Style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PassengerForm from '../Components/PassengerForm';
import logo from '../Assets/new.png'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Payment() {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice;
  const total = location.state?.total;
  const flight = location.state?.flight;

  console.log(totalPrice);
  console.log(flight);

  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [cardType, setCardType] = useState(''); // New state to store card type
  const [paymentSuccess, setPaymentSuccess] = useState(false); // New state for payment success

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Check card type when entering the card number
    if (name === 'cardNumber') {
      checkCardType(value);
    }
    
  };

  const checkCardType = (cardNumber) => {
    // Define regular expressions for different card types
    const visaRegex = /^4/;
    const mastercardRegex = /^5[1-5]/;
    const amexRegex = /^3[47]/;
    const discoverRegex = /^6(?:011|5)/;

    let cardType = '';

    if (visaRegex.test(cardNumber)) {
      cardType = 'Visa';
    } else if (mastercardRegex.test(cardNumber)) {
      cardType = 'MasterCard';
    } else if (amexRegex.test(cardNumber)) {
      cardType = 'American Express';
    } else if (discoverRegex.test(cardNumber)) {
      cardType = 'Discover';
    }

    console.log('Card Type:', cardType);
    setCardType(cardType);
  };

  const handleCheckout = () => {
    // Validate form data
    if (!formData.name || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      alert('Please fill in all the fields');
      return;
    }

    // Validate card number (for demonstration purposes only)
    const cardRegex = /^(\d{4} ){3}\d{4}$/;
    if (!cardRegex.test(formData.cardNumber)) {
      alert('Invalid card number format');
      return;
    }

    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format regex
    if (!expiryDateRegex.test(formData.expiryDate)) {
      alert('Invalid expiry date format. Please enter in MM/YY format.');
      return;
    }

    // Simulate successful payment
    setPaymentSuccess(true);
    toast.success("Payment Successfull !")
  };

  return (
    <div className='container p-5 my-5'>
      <Row className="justify-content-center">
        <Col xs={12} md={paymentSuccess ? 6 : 4} className={paymentSuccess ? 'offset-md-3' : ''}>
          <section className={`add-card page text-center mx-auto ${paymentSuccess ? 'slide-out-left' : ''}`}>
            <form className="form">
              <h6 className='fw-bold text-light'> <span>            <img className='logo mx-auto' src={logo} alt=""/> </span>Payment to proceed !</h6>
<label htmlFor="name" className="label">
                <span className="title">Card holder full name</span>
                <input
                  className="input-field"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </label>
              <label htmlFor="serialCardNumber" className="label">
                <span className="title">Card Number</span>
                <input
                  id="serialCardNumber"
                  className="input-field"
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000 0000"
                />
                {cardType && <span className="card-type">{cardType}</span>}
              </label>
              <div className="split">
                <label htmlFor="ExDate" className="label">
                  <span className="title">Expiry Date</span>
                  <input
                    id="ExDate"
                    className="input-field"
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    title="Expiry Date"
                    placeholder="01/23"
                  />
                </label>
                <label htmlFor="cvv" className="label">
                  <span className="title">CVV</span>
                  <input
                    id="cvv"
                    className="input-field"
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    title="CVV"
                    maxLength={3}
                    placeholder="CVV"
                  />
                </label>
              </div>
              <input
                className={`checkout-btn ${paymentSuccess ? 'success' : ''}`}
                type="button"
                value={paymentSuccess ? 'Payment Successful ✔' : `Pay ₹${totalPrice}`}
                onClick={handleCheckout}
              />
            </form>
          </section>
        </Col>
        {paymentSuccess && (
          <Col xs={12} md={6}>
            <PassengerForm numberOfTravelers={total} flight={flight} />
          </Col>
        )}
      </Row>
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
  );
}

export default Payment;
