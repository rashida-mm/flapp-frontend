import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home'
import Flights from './Pages/Flights'
import Booking from './Pages/Booking'
import Auth from './Pages/Auth'
import UserProfile from './Pages/UserProfile'
import Payment from './Pages/Payment';

function App() {
  return (
    <div className="App">
  <Routes>
      <Route path='/' element={<Home/> }  />
      <Route path='/flights' element={<Flights/> }  />
      <Route path='/booking' element={<Booking/> }  />
      <Route path='/profile' element={<UserProfile/>}  />
      <Route path='/login' element={<Auth />} />
      <Route path='/payment' element={<Payment />} />
        <Route path='/register' element={<Auth register />} />
      <Route />
      <Route />

    </Routes>
    </div>
  );
}

export default App;
