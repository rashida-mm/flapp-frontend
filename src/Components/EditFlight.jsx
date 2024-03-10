import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../Assets/img.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../services/baseUrl';
import { editFlightAPI } from '../services/allAPI'
import { editFlightResContext } from '../ContextAPI/ContextShare';


function EditFlight({ flight }) {

  const { editFlightRes, setEditflightRes } = useContext(editFlightResContext)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //create state to hold flight details
  const [flightDet, setFlightdet] = useState(
    {
      id: flight._id,
      airline: flight.airline,
      airlineLogo: "",
      flightNumber: flight.flightNumber,
      departureAirport: flight.departureAirport,
      destinationAirport: flight.destinationAirport,
      departureDate: flight.departureDate,
      departureTime: flight.departureTime,
      arrivalDate: flight.arrivalDate,
      arrivalTime: flight.arrivalTime,
      price: flight.price,
      layover: flight.layover,
      duration: flight.duration
    }
  )
  console.log(flightDet);

  //create a  state to hold image url
  const [preview, setPreview] = useState("")
  console.log(preview);

  useEffect(() => {
    if (flightDet.airlineLogo) {
      //convert to url
      setPreview(URL.createObjectURL(flightDet.airlineLogo))
    }
  }, [flightDet.airlineLogo])

  //fligth details updation
  const updateFlight = async () => {
    const { id,
      airline, airlineLogo, flightNumber, departureAirport, destinationAirport, departureDate, departureTime, arrivalDate, arrivalTime, price, layover, duration
    } = flightDet

    const reqBody = new FormData() ///because their is a fle uploaded content
    reqBody.append("airline", airline)
    reqBody.append("flightNumber", flightNumber)
    reqBody.append("departureAirport", departureAirport)
    reqBody.append("destinationAirport", destinationAirport)
    reqBody.append("departureDate", departureDate)
    reqBody.append("departureTime", departureTime)
    reqBody.append("arrivalDate", arrivalDate)
    reqBody.append("arrivalTime", arrivalTime)
    reqBody.append("price", price)
    reqBody.append("layover", layover)
    reqBody.append("duration", duration)
    preview ? reqBody.append("airlineLogo", airlineLogo) : reqBody.append("airlineLogo", flight.airlineLogo)

    const token = sessionStorage.getItem("token")
    console.log(token);

    //api call
    if (preview) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",  //req contains a file upload content( image )
        "Authorization": `Bearer ${token}`  // req contains token for backend
      }

      const result = await editFlightAPI(id, reqBody, reqHeader)
      console.log(result);
      if (result.status === 200) {
        setEditflightRes(result.data)
        handleClose()
      }
      else {
        console.log(result.response.data);
      }
    }

    else {
      const reqHeader = {
        "Content-Type": "multipart/form-data",  //req contains a file upload content( image )
        "Authorization": `Bearer ${token}`  // req contains token for backend
      }
      const result = await editFlightAPI(id, reqBody, reqHeader)
      console.log(result);
      if (result.status === 200) {
        setEditflightRes(result.data)
        handleClose()
      }
      else {
        console.log(result.response.data);
      }

    }
  }


  return (
    <div>
      <button className='btn shadow-0 text-success' onClick={handleShow}><i class="fa-solid fa-pen"></i></button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>
              <input onChange={e => setFlightdet({ ...flightDet, airlineLogo: e.target.files[0] })} type="file" name='file' style={{ display: 'none' }} />
              <img width={'200px'} src={preview ? preview : `${baseUrl}/uploads/${flight.airlineLogo}`} alt="" />
            </label>
            <div className='inp'>
              <input value={flightDet.airline} onChange={e => setFlightdet({ ...flightDet, airline: e.target.value })} className='form-control rounded-5 mb-3' placeholder='Airline' type="text" />
              <input value={flightDet.flightNumber} onChange={e => setFlightdet({ ...flightDet, flightNumber: e.target.value })} className='form-control rounded-5 mb-3' placeholder='Flight Number' type="text" />
              <input value={flightDet.departureAirport} onChange={e => setFlightdet({ ...flightDet, departureAirport: e.target.value })} className='form-control rounded-5 mb-3' placeholder='Departure Airport' type="text" />
              <input value={flightDet.destinationAirport} onChange={e => setFlightdet({ ...flightDet, destinationAirport: e.target.value })} className='form-control rounded-5 mb-3' placeholder='Destination Airport' type="text" />
              <input value={flightDet.departureDate} onChange={e => setFlightdet({ ...flightDet, departureDate: e.target.value })} className='form-control rounded-5 mb-3' placeholder='Departure Date' type="date" />
              <input value={flightDet.departureTime} onChange={e => setFlightdet({ ...flightDet, departureTime: e.target.value })} className='form-control rounded-5 mb-3' placeholder='Departure Time' type="text" />
              <input value={flightDet.arrivalDate} onChange={e => setFlightdet({ ...flightDet, arrivalDate: e.target.value })} className='form-control rounded-5 mb-3' placeholder='Arrival Date' type="date" />
              <input value={flightDet.arrivalTime} onChange={e => setFlightdet({ ...flightDet, arrivalTime: e.target.value })} className='form-control rounded-5 mb-3' placeholder='Arrival Time' type="text" />
              <input value={flightDet.price} onChange={e => setFlightdet({ ...flightDet, price: e.target.value })} className='form-control rounded-5 mb-3' placeholder='Price' type="text" />
              <input value={flightDet.layover} onChange={e => setFlightdet({ ...flightDet, layover: e.target.value })} className='form-control rounded-5 mb-3' placeholder='Layover' type="text" />
              <input value={flightDet.duration} onChange={e => setFlightdet({ ...flightDet, duration: e.target.value })} className='form-control rounded-5 mb-3' placeholder='Duration' type="text" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateFlight} variant="secondary" type='submit'>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
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
  )
}

export default EditFlight
