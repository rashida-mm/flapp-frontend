import React from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { baseUrl } from '../services/baseUrl';
import { Document,Image, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

function User() {
  const location = useLocation();
  const userBookingDetails = location.state?.userBookingDetails;

  // Function to generate PDF ticket for a passenger
const generateTicketPDF = (passenger) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Flight e-Ticket</Text>
        <Text>E-Ticket Source</Text>
        <Text>FlApp</Text>
        <Text>www.flapp.com</Text>
        <Text style={styles.heading}>Traveller Information</Text>
        <Text>{passenger.fullName}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Date</Text>
            <Text style={styles.tableCellHeader}>Dep Time</Text>
            <Text style={styles.tableCellHeader}>From</Text>
            <Text style={styles.tableCellHeader}>Arr Time</Text>
            <Text style={styles.tableCellHeader}>To</Text>
            <Text style={styles.tableCellHeader}>Flight No.</Text>
            <Text style={styles.tableCellHeader}>Airline</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{userBookingDetails.flight.departureDate}</Text>
            <Text style={styles.tableCell}>{userBookingDetails.flight.departureTime}</Text>
            <Text style={styles.tableCell}>{userBookingDetails.flight.departureAirport}</Text>
            <Text style={styles.tableCell}>{userBookingDetails.flight.arrivalTime}</Text>
            <Text style={styles.tableCell}>{userBookingDetails.flight.destinationAirport}</Text>
            <Text style={styles.tableCell}>{userBookingDetails.flight.flightNumber}</Text>
            <Image  src={`${baseUrl}/uploads/${userBookingDetails.flight?.airlineLogo}`} style={styles.logo} />
                      </View>
        </View>
        <Text style={styles.heading}>Detailed Itinerary</Text>
        <Text>{userBookingDetails.flight.departureAirport} to {userBookingDetails.flight.destinationAirport}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>FLT No.</Text>
            <Text style={styles.tableCellHeader}>DEP TIME</Text>
            <Text style={styles.tableCellHeader}>ARR TIME</Text>
            <Text style={styles.tableCellHeader}>STATUS</Text>
            <Text style={styles.tableCellHeader}>DUR</Text>
            <Text style={styles.tableCellHeader}>LAYOVER</Text>
            <Text style={styles.tableCellHeader}>TYPE</Text>
            <Text style={styles.tableCellHeader}>BAGGAGE</Text>
          </View>
          <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{userBookingDetails.flight.flightNumber}</Text>
            <Text style={styles.tableCell}>{userBookingDetails.flight.departureTime}</Text>
            <Text style={styles.tableCell}>{userBookingDetails.flight.arrivalTime}</Text>
            <Text style={styles.tableCell}>CONFIRMED</Text>
            <Text style={styles.tableCell}>{userBookingDetails.flight.duration}</Text>
            <Text style={styles.tableCell}>{userBookingDetails.flight.layover}</Text>
            <Text style={styles.tableCell}>{userBookingDetails.flight.classType}</Text>
            <Text style={styles.tableCell}>30 KG + 7</Text>
                      </View>

        </View>
        <Text style={styles.date}>Date of Ticket Issued: {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  heading: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    backgroundColor: 'darkblue',
    color: 'white' // Added color property for heading text
  },
  table: {
    display: 'table',
    marginTop:10,
    marginBottom:10,
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    fontSize:15,
    width: '25%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    textAlign: 'center', // Center align the text
  },
  tableCell: {
    width: '25%',
    fontSize:'10px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    textAlign: 'center' // Center align the text
  },
  logo: {
    width: 50, // Set width as needed
  }
});

  
  return (
    <div>
      <div className="p-4 m-3 bg-info rounded-5 text-white">
        <h4>Bookings</h4>
        <Table striped hover size="sm">
          <thead>
            <tr>
              <th className='text-white'>Full Name</th>
              <th className='text-white'>Contact</th>
              <th className='text-white'>Ticket</th>
            </tr>
          </thead>
          <tbody>
            {userBookingDetails.passengerDetails.map((passenger, index) => (
              <tr key={index}>
                <td className='text-white'>{passenger.fullName}</td> 
                <td className='text-white'>{passenger.contactNumber}</td> 
                <td>
                  {/* Download link for generating PDF ticket */}
                  <PDFDownloadLink document={generateTicketPDF(passenger)} fileName={`ticket_${passenger.fullName}.pdf`}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Ticket')}
                  </PDFDownloadLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Table striped hover size="sm" className='my-5'>
            <thead>
              <tr>
                <th className='text-white'>Name</th>
                <th className='text-white'>Flight Number</th>
                <th className='text-white'>Logo</th>
                <th className='text-white'>From</th>
                <th className='text-white'>To</th>
                <th className='text-white'>Departure Date</th>
                <th className='text-white'>Departure Time</th>
                <th className='text-white'>Arrival Date</th>
                <th className='text-white'>Arrival Time</th>
                <th className='text-white'>Class Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='text-white'>{userBookingDetails.flight?.airline}</td> 
                <td className='text-white'>{userBookingDetails.flight?.flightNumber}</td> 
                <td className='text-white'><img width={'50px'} src={`${baseUrl}/uploads/${userBookingDetails.flight?.airlineLogo}`} alt="Airline Logo" /></td>
                <td className='text-white'>{userBookingDetails.flight?.departureAirport}</td>
                <td className='text-white'>{userBookingDetails.flight?.destinationAirport}</td>
                <td className='text-white'>{userBookingDetails.flight?.departureDate}</td>
                <td className='text-white'>{userBookingDetails.flight?.departureTime}</td>
                <td className='text-white'>{userBookingDetails.flight?.arrivalDate}</td>
                <td className='text-white'>{userBookingDetails.flight?.arrivalTime}</td>
                <td className='text-white'>{userBookingDetails.flight?.classType}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default User;
