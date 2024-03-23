import React, { useState, useRef, useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';
import { getSearchflightAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

function FlightSearch() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const classOptions = ['Economy', 'Business', 'First Class'];
  const [selectedClass, setSelectedClass] = useState('');

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const locationRef = useRef('');
  const tolocationRef = useRef('');
  const dateRef = useRef('');
  const classRef = useRef('');

  const [filteredFlights, setFilteredflights] = useState([]);

  // State to hold search flights
  const [allFlights, setAllflights] = useState([]);

  // API call
  const availFlights = async () => {
    const searchParams = {
      departureAirport: locationRef.current.value,
      destinationAirport: tolocationRef.current.value,
      departureDate: dateRef.current.value,
      classType: classRef.current.value,
    };

    console.log(searchParams);

    const result = await getSearchflightAPI(searchParams);
    console.log(result);
    if (result.status === 200) {
      setAllflights(result);
      console.log(allFlights.data);
      setFilteredflights(result.data);
      console.log(filteredFlights);
    } else {
      console.log(result.response.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // Prevent the default form submission behavior
    const departureAirport = locationRef.current.value;
    const destinationAirport = tolocationRef.current.value;
    const departureDate = dateRef.current.value;
    const classtype = classRef.current.value;

    if (departureAirport !== '' && destinationAirport !== '' && departureDate !== '' && classtype !== '') {
      await availFlights();
    } else {
      alert('All fields are required');
      return;
    }
  };

  useEffect(() => {
    if (filteredFlights.length > 0) {
      const flightsWithClassType = filteredFlights.map((flight) => ({
        ...flight,
        classType: classRef.current.value,
      }));

      navigate('/flights', { state: { flights: flightsWithClassType } });
    }
  }, [filteredFlights, navigate]);

  return (
    <div className='container p-3 rounded-9 shadow' style={{border:'1px solid #FF6D38'}}>
      <Form noValidate validated={validated}>
        <Row className='mb-3'>
          <Form.Group as={Col} md='2' controlId='validationCustom01'>
            <Form.Label>
              <i class='fa-solid fa-location-dot'></i> From
            </Form.Label>
            <Form.Control required type='text' ref={locationRef} placeholder='Departure City/Airport' />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='validationCustom02'>
            <Form.Label>
              <i class='fa-solid fa-location-dot'></i> To
            </Form.Label>
            <Form.Control required type='text' ref={tolocationRef} placeholder='Destination City/Airport' />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='validationCustom03'>
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
            </Form.Select>
            <Form.Control.Feedback type='invalid'>Please provide a valid class.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='validationCustom04'>
            <Form.Label>
              <i class='fa-solid fa-plane-departure'></i> Departure
            </Form.Label>
            <Form.Control ref={dateRef} className='form-control' type='date' placeholder='Departure date' required />
            <Form.Control.Feedback type='invalid'>Please provide a valid date.</Form.Control.Feedback>
          </Form.Group>
          <Button
            as={Col}
            style={{ height: '40px', marginTop: '30px',backgroundColor:'#FF6D38' }}
            onClick={handleSearch}
            type='submit'
            className='rounded-9'
          >
            Search Flights
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default FlightSearch;
