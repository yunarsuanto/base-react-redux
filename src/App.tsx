import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ListPage from './pages/ListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<HomePage />} />
        <Route path="/admin" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
