import React, { useState,useRef, useEffect } from 'react'
import {Col,Form,FormGroup} from "react-bootstrap"
import '../Components/Style.css'
import { getSearchflightAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function FlightSearch() {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };


  const navigate = useNavigate()
  const classOptions = ['Economy', 'Business', 'First Class'];
  const [selectedClass, setSelectedClass] = useState('');
  const [tripType, setTripType] = useState('one-way');

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const locationRef = useRef('')
  const tolocationRef = useRef('')
  const dateRef = useRef('')
  const redateRef = useRef('')
  const classRef = useRef('')

  const [filteredFlights,setFilteredflights] = useState([])

   //state to hold search flights
   const [allFlights,setAllflights] = useState([])

   //api call
   const availFlights = async()=>{
    const searchParams = {
      departureAirport: locationRef.current.value,
      destinationAirport: tolocationRef.current.value,
      departureDate: dateRef.current.value,
      arrivalDate: redateRef.current.value,
      classType: classRef.current.value,
    };

    console.log(searchParams);

     const result = await getSearchflightAPI(searchParams)
     console.log(result);
     if(result.status === 200){
       setAllflights(result)
       console.log(allFlights.data);
       setFilteredflights(result.data);
       console.log(filteredFlights);
     }
     else{
       console.log(result.response.message);
     }
   }

 const handleSearch = async (e) => {
  e.preventDefault();
   // Prevent the default form submission behavior
   const departureAirport = locationRef.current.value;
   const destinationAirport = tolocationRef.current.value;
   const departureDate = dateRef.current.value;
   const arrivalDate = redateRef.current.value;
   const classtype = classRef.current.value;

   if (departureAirport !== '' && destinationAirport !== '' && departureDate !== ''  && classtype !== '') {
    setTripType('one-way');
  } else if (departureAirport !== '' && destinationAirport !== '' && departureDate !== '' || arrivalDate !== '' && classtype !== '') {
    setTripType('round-trip');
  } else {
    alert('All fields are required');
    return;
  }
  await availFlights();
};

useEffect(() => {
  if (filteredFlights.length > 0) {
    const flightsWithClassType = filteredFlights.map(flight => ({
      ...flight,
      classType: classRef.current.value,
    }));

    navigate('/flights', { state: { flights: flightsWithClassType } });
  }
}, [filteredFlights, navigate]);


useEffect(() => {
  console.log(tripType); // This will print the updated value of tripType
  }, [tripType]);


  return (
    <div className='container border border-info p-3 rounded-9 shadow'>

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="2" controlId="validationCustom01">
        <Form.Label>
          <i class="fa-solid fa-location-dot"></i> From
          </Form.Label>                  <Form.Control
            required
            type="text"
            ref={locationRef}
            placeholder='Departure City/Airport'
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom02">
          <Form.Label>
          <i class="fa-solid fa-location-dot"></i> To
          </Form.Label>
          <Form.Control
            required
            type="text"
            ref={tolocationRef}
            placeholder='Destination City/Airport'          
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom03">
          <Form.Label>Class</Form.Label>
          <Form.Select
 ref={classRef}
          className='form-control'
          value={selectedClass}
          onChange={handleClassChange}
        >
          {classOptions.map((option, index) => (
            <option key={index} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </Form.Select>          <Form.Control.Feedback type="invalid">
            Please provide a valid class.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom04">
          <Form.Label><i class="fa-solid fa-plane-departure"></i> Departure</Form.Label>
          <Form.Control  ref={dateRef} className='form-control' type="date" placeholder='Departure date' required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom05">
        <Form.Label><i class="fa-solid fa-plane-arrival"></i> Departure</Form.Label>
          <Form.Control ref={redateRef} className='form-control' type="date" placeholder='Return' required />
          <Form.Control.Feedback type="invalid">
          Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
        <Button as={Col} style={{height:'40px', marginTop:'30px'}}  onClick={handleSearch} type="submit" className='rounded-9' >Search Flights</Button>
      
      </Row>
    </Form>  
      
    </div>
  )
}

export default FlightSearch