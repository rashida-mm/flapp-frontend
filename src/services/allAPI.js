//actuall api calls happens here

import { baseUrl } from "./baseUrl"
import { commonAPI } from "./CommonAPI"

//register api call - post
export const registerAPI = async(user)=>{
    return await commonAPI('post',`${baseUrl}/register`,user,'')
}

//login api call - post
export const loginAPI = async(user)=>{
    return await commonAPI('post',`${baseUrl}/login`,user,'')
}

//api call for add flight - post
export const addFlightAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('post',`${baseUrl}/flight/add`,reqBody,reqHeader)
}

//get all admin flights 
export const getAlladminFlightAPI = async(reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/flight/all-admin-flights`,"",reqHeader)
}

// get search flight
export const getSearchflightAPI = async (searchParams) => {
    const queryString = Object.entries(searchParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
  
    return await commonAPI('get', `${baseUrl}/flight/all-search-flights?${queryString}`, "", "");
  }

//edit flight
export const editFlightAPI = async(flightId,reqBody,reqHeader)=>{
    return await commonAPI('put',`${baseUrl}/flight/update-flights/${flightId}`,reqBody,reqHeader)
}

//delete fligth
export const deleteFlightAPI = async(flightId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/flight/delete-flights/${flightId}`,{},reqHeader)
}

//booking API call - post
export const bookFlightAPI = async (bookingDetails, reqHeader) => {
    return await commonAPI('post', `${baseUrl}/booking/book-flight`, bookingDetails, reqHeader);
}
