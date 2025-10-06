import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Home';
import { useAppDispatch, useAppSelector } from './app/hook';
import axios from 'axios';
import { getToken } from './features/auth/authState';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const { token, isAuthenticated } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log('---- isAuthenticated')
    console.log(isAuthenticated)
    console.log('---- isAuthenticated')
    if (!token) {
      dispatch(getToken())
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token, dispatch, isAuthenticated]);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && (
          <Sidebar />
        )}
        <div style={{ flex: 1, padding: 20 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
