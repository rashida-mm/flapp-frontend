import React, { createContext, useEffect, useState } from 'react'

export const addFlightResContext = createContext()
export const editFlightResContext = createContext()
export const bookingResContext = createContext();
export const Booking = createContext()

function ContextShare({children}) {

    const [addFlightRes,setAddFlightRes] = useState("")
    const [editFlightRes,setEditflightRes] = useState("")
    const [selectedFlight, setSelectedFlight] = useState("");

    //to pass values to user profile
    const [bookingDetails, setBookingDetails] = useState("");
   
    // Load data from local storage when the component mounts
  useEffect(() => {
    const storedSelectedFlight = JSON.parse(localStorage.getItem('selectedFlight'));
    if (storedSelectedFlight) {
      setSelectedFlight(storedSelectedFlight);
    }
  }, []);

  // Save data to local storage when selectedFlight changes
  useEffect(() => {
    localStorage.setItem('selectedFlight', JSON.stringify(selectedFlight));
  }, [selectedFlight]);
  
  const storeBookingDetails = (details) => {
    setBookingDetails(details);
  };

  return (
    <>
      <addFlightResContext.Provider value={{addFlightRes,setAddFlightRes}}>
<editFlightResContext.Provider value={{editFlightRes,setEditflightRes}}>
<bookingResContext.Provider value={{selectedFlight, setSelectedFlight}} >
<Booking.Provider value={{bookingDetails, setBookingDetails}}>
{children}
</Booking.Provider>
</bookingResContext.Provider>
</editFlightResContext.Provider>
      </addFlightResContext.Provider >
    </>
  )
}

export default ContextShare
