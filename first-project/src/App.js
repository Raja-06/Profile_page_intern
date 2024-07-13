import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import ProfileDetails from './components/ProfileDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path="/profile-details" element={<ProfileDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

