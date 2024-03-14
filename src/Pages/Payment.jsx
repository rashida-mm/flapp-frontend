import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../Components/Style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PassengerForm from '../Components/PassengerForm';

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


    // Simulate successful payment
    setPaymentSuccess(true);
  };

  return (
    <div className='container p-5 my-5'>

      <Row className="justify-content-center">
        <Col>
          <section className="add-card page text-center mx-auto">
            <form className="form">
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
                  <span className="title"> CVV</span>
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
        <Col>
        {paymentSuccess && <PassengerForm numberOfTravelers={total} flight={flight}  />}
</Col>

      </Row>
    </div>
  );
}

export default Payment;
