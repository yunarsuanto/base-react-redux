// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { loginUser } from '../features/auth/authState';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector(state => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ username, password }));
        
        if (loginUser.fulfilled.match(result)) {
            navigate('/dashboard');
        }
    };

    useEffect(() => {
    if (isAuthenticated) {
        navigate('/dashboard');
    }
    }, [isAuthenticated, navigate]);

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
            />
            <button type="submit" style={{ padding: 10, width: '100%' }}>
                Login
            </button>
            {/* <button type="submit" disabled={loading} style={{ padding: 10, width: '100%' }}>
            {loading ? 'Logging in...' : 'Login'}
            </button> */}
        </form>
        {/* {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>} */}
        </div>
    );
};

export default Home;
