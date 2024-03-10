import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../Assets/img.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addFlightAPI } from '../services/allAPI';
import { addFlightResContext } from '../ContextAPI/ContextShare';

function AddFlights() {

  const {addFlightRes,setAddFlightRes} = useContext(addFlightResContext)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //to hold token
  const [token, setToken] = useState("")

  //to assig token
  useEffect(() => {   //this will get u token from session storage
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])
  

  //create state to hold flight details
  const [flightDet, setFlightdet] = useState(
    {
      airline: "",
      airlineLogo: "",
      flightNumber: "",
      departureAirport: "",
      destinationAirport: "",
      departureDate: "",
      departureTime: "",
      arrivalDate: "",
      arrivalTime: "",
      price: "",
      layover: "",
      duration: ""
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

  const saveFlight = async () => {
    const { airline, airlineLogo, flightNumber, departureAirport, destinationAirport, departureDate, departureTime, arrivalDate, arrivalTime, price, layover, duration } = flightDet
    if (!airline || !airlineLogo || !flightNumber || !departureAirport || !destinationAirport || !departureDate || !departureTime || !arrivalDate || !arrivalTime || !price || !duration) {
      toast.error("Please enter all the Details")
    }
    else {
      const reqBody = new FormData() ///because their is a fle uploaded content
      reqBody.append("airline", airline)
      reqBody.append("airlineLogo", airlineLogo)
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

      const reqHeader = {
        "Content-Type": "multipart/form-data",  //req contains a file upload content( image )
        "Authorization": `Bearer ${token}`  // req contains token for backend
      }

      //api call
      const result = await addFlightAPI(reqBody, reqHeader)
      console.log(result);
      if (result.status === 200) {
        console.log(result.data);
        toast.success("Flight Added Succesfully")
        handleClose()
        setAddFlightRes(result.data)//context access the addflight data
        setFlightdet(
          {
            airline: "",
            airlineLogo: "",
            flightNumber: "",
            departureAirport: "",
            destinationAirport: "",
            departureDate: "",
            departureTime: "",
            arrivalDate: "",
            arrivalTime: "",
            price: "",
            layover: "",
            duration: ""
          }
        )
        setPreview("")
      } else {
        alert(result.response.data);
        console.log(result.response.data);
      }
      
    }
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Flight
      </Button>

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
              <img width={'200px'} src={preview ? preview : img} alt="" />
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
          <Button onClick={saveFlight} variant="secondary" type='submit'>
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

export default AddFlights
