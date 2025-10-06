import React from 'react';
import { useAppSelector } from '../app/hook';

const Dashboard: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        return (
        <div style={{ textAlign: 'center' }}>
            <h2>Login dulu untuk mengakses Dashboard</h2>
        </div>
        );
    }

    return (
        <div>
        <h1>Welcome, wadaw</h1>
        <p>Ini adalah Dashboard aplikasi kamu.</p>
        {/* nanti bisa ditambahkan chart, table, dsb */}
        </div>
    );
};

export default Dashboard;
