import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { bookFlightAPI } from '../services/allAPI';
import logo from '../Assets/new.png'

function PassengerForm({ numberOfTravelers  }) {
  const navigate = useNavigate();
  const [passengerDetails, setPassengerDetails] = useState([]);
  const location = useLocation();
  const flight = location.state?.flight;

  const renderPassengerInputs = () => {
    const inputs = [];
    for (let i = 0; i < numberOfTravelers; i++) {
      inputs.push(
        <div key={i} style={{border:'1px solid #FF6D38'}} className='card shadow m-3 p-4 w-100 rounded-9'>
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


  //bookings add

       //to hold token
       const [token, setToken] = useState("")

       //to assig token
       useEffect(() => {   //this will get u token from session storage
         if (sessionStorage.getItem("token")) {
           setToken(sessionStorage.getItem("token"))
         }
       }, [])

    const handleSubmit = async () => {
      try {
        // Prepare booking details for API call
        const bookingDetails = {
          ...flight,
          passengerDetails: passengerDetails || []
                };
  

      // Set up request headers with the token
      const reqHeader = {
        "Content-Type": "multipart/form-data",  //req contains a file upload content( image )
        "Authorization": `Bearer ${token}`  // req contains token for backend
      }

        // Make API call to book flight
        const result = await bookFlightAPI(bookingDetails,reqHeader);
  
        if (result.status === 200) {
          console.log(result.data.booking);
          // Redirect to profile page if booking is successful
        }
        navigate('/profile');
      } catch (error) {
        console.error('Error:', error);
        // Handle error if API call fails
      }
    };

  return (
    <div className=' p-3 rounded-9'>
<div className="ms-3 container rounded-9" style={{border:'1px solid #FF6D38'}}>
<h2 className='fw-bold'> <span><img className='logo mx-auto' src={logo} alt=""/> </span>Passenger Details </h2>
</div>
      {renderPassengerInputs()}
      <button  className='btn btn-success d-flex mx-auto' onClick={handleSubmit}>
        Submit
      </button>
         </div>
  );
}

export default PassengerForm;
