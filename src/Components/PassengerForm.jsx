import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function PassengerForm({ numberOfTravelers  }) {
  const navigate = useNavigate();
  const [passengerDetails, setPassengerDetails] = useState([]);
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;
  const flight = location.state?.flight;

  const renderPassengerInputs = () => {
    const inputs = [];
    for (let i = 0; i < numberOfTravelers; i++) {
      inputs.push(
        <div key={i} className='m-3 p-2 rounded-9'>
          <h4>Passenger {i + 1}</h4>
          <label className='d-block mb-2'>
            Full Name:
  <input
              className='form-control bg-light border-0 shadow'
              type="text"
              name={`fullName${i + 1}`}
              onChange={(e) => handleInputChange(i, 'fullName', e.target.value)}
            />          </label>
          <label className='d-block'>
            Contact Number:
            <input
              className='form-control bg-light border-0 shadow'
              type="text"
              name={`contactNumber${i + 1}`}
              onChange={(e) => handleInputChange(i, 'contactNumber', e.target.value)}
            />
                      </label>
        </div>
      );
    }
    return inputs;
  };

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
    };
    setPassengerDetails(updatedDetails);
  };


  const handleSubmit = () => {
    const userBookingDetails = {
      passengerDetails,
      flight,
    };

    // Here, you can use userBookingDetails to send the data to the backend or store it as needed
    // For now, we'll simply navigate to /profile with the userBookingDetails
    navigate('/profile', { state: { userBookingDetails } });
  };
  
  return (
    <div className=' p-3 rounded-9'>
      <h2>Passenger Details</h2>
      {renderPassengerInputs()}
      <button  className='btn btn-success d-flex mx-auto' onClick={handleSubmit}>
        Submit
      </button>
         </div>
  );
}

export default PassengerForm;
