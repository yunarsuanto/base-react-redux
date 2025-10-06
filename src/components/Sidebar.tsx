import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hook';
import { logout } from '../features/auth/authState';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div style={{
      width: 200,
      height: '100vh',
      background: '#333',
      color: '#fff',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <h2>My App</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link></li>
        <li><Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link></li>
        <li><Link to="/settings" style={{ color: '#fff', textDecoration: 'none' }}>Settings</Link></li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
