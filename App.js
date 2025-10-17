import React from 'react';
import PostSessionSummary from './PostSessionSummary';
import AddChargingSpot from './AddChargingSpot';
import HostRegistration from './HostRegistration';
import ProfileSection from './ProfileSection';
import ChargingSession from './ChargingSession';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path ="/" element={<ChargingSession/>}></Route>
        <Route path ="/PostSessionSummary" element={<PostSessionSummary/>}></Route>
        <Route path ="/HostRegistration" element={<HostRegistration/>}></Route>
        <Route path ="/AddChargingSpot" element={<AddChargingSpot/>}></Route>
        <Route path ="/ProfileSection" element={<ProfileSection/>}></Route>
      </Routes>
    </Router>
   
    </div>
  )};

export default App;