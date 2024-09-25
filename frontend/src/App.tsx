import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './pages/login';
import ProfilePage from './pages/profile';
import PrivateRoute from './components/private-route';

function App() {
  return (
    <div className="root">
      {/* <ProfilePage /> */}

      <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="" element={<ProfilePage />} />
        </Route>
        {/* Redirect any unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
