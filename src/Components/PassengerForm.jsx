import React from 'react';

function PassengerForm({ numberOfTravelers }) {
  const renderPassengerInputs = () => {
    const inputs = [];
    for (let i = 0; i < numberOfTravelers; i++) {
      inputs.push(
        <div key={i} className='m-3 p-2 rounded-9'>
          <h4>Passenger {i + 1}</h4>
          <label className='d-block mb-2'>
            Full Name:
            <input className='form-control bg-light border-0 shadow' type="text" name={`fullName${i + 1}`} />
          </label>
          <label className='d-block'>
            Contact Number:
            <input className='form-control bg-light border-0 shadow' type="text" name={`contactNumber${i + 1}`} />
          </label>
        </div>
      );
    }
    return inputs;
  };

  return (
    <div className=' p-3 rounded-9'>
      <h2>Passenger Details</h2>
      {renderPassengerInputs()}
      <button className='btn btn-success d-flex mx-auto'>Submit</button>
    </div>
  );
}

export default PassengerForm;
