import React, { useContext, useEffect, useState } from 'react'
import AddFlights from './AddFlights'
import { deleteFlightAPI, getAlladminFlightAPI} from '../services/allAPI'
import Table from 'react-bootstrap/Table';
import { baseUrl } from '../services/baseUrl';
import { addFlightResContext, editFlightResContext } from '../ContextAPI/ContextShare';
import EditFlight from './EditFlight';

function Admin() {

  const {editFlightRes,setEditflightRes} = useContext(editFlightResContext)

  const {addFlightRes,setAddFlightRes} = useContext(addFlightResContext)

  const [alladminFlights,setAlladminflights]=useState([])

  //api call
  let alladminFlight = async()=>{
    //get token
    const token = sessionStorage.getItem('token')
    console.log(token);
    if(token){
      const reqHeader={
        'Content-type':'multipart/form-data',
        "Authorization":`Bearer ${token}`
    }
    try{
      const result = await getAlladminFlightAPI(reqHeader)
      console.log(result);
      if(result.status==200){
        setAlladminflights(result.data)
        console.log(alladminFlights);
      }
      else{
        alert("Failed to fetch")
      }
    }
    catch(err){
      console.log("error wile fetching" ,err);
      alert("error")
    }
  }
}
useEffect(()=>{
  alladminFlight()
},[addFlightRes,editFlightRes])


const deleteFlight=async(fid)=>{
  
  //get token
  const token = sessionStorage.getItem('token')
  console.log(token);
  if(token){
    const reqHeader={
      'Content-type':'multipart/form-data',
      "Authorization":`Bearer ${token}`
  }
  try{
    //api fetch
    const result = await deleteFlightAPI(fid,reqHeader)
    console.log(result);
    if(result.status === 200){
      alladminFlight()
    }
  }
  catch(err){
    console.log(err);
  }
}
}

  return (
    <div>
      <div className="container d-flex mt-5">
      <h2>Flights Schedule</h2>
        <div className='ms-auto'>
            {/* Add projects */}
        <AddFlights/>
      </div>
    </div>
 <div className='d-flex text-dark justify-content-between'>
 <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>airline</th>
          <th>Logo</th>
          <th> departureAirport</th>
          <th> destinationAirport</th>
          <th> departureDate</th>
          <th> departureTime</th>
          <th> arrivalDate</th>
          <th> arrivalTime</th>
          <th> price</th>
          <th> layover</th>
          <th> duration</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {alladminFlights?.map((item)=>(
        <tr>
          <td>{item.airline}</td> 
          <td>
            <img width={'50px'} src={`${baseUrl}/uploads/${item.airlineLogo}`} alt="" /></td>     
                     <td>{item.departureAirport}</td>
          <td>{item.destinationAirport}</td>
          <td>{item.departureDate}</td>
          <td>{item.departureTime}</td>
          <td>{item.arrivalDate}</td>
          <td>{item.arrivalTime}</td>
          <td>{item.price}</td>
          <td>{item.layover}</td>
          <td>{item.duration}</td>
          <td>
            <div >
              <button className='btn shadow-0' >
              <EditFlight flight={item}/>
              </button>
              <button onClick={()=>deleteFlight(item?._id)} className='mx-4 btn shadow-0 text-danger'><i class="fa-solid fa-trash"></i></button>
            </div>
          </td>

        </tr>
            ))}
      </tbody>
    </Table>
 </div>  
           
               </div>


  )
}

export default Admin
