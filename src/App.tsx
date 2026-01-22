import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '@/routes/ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import PWAInstallPrompt from './components/PWAInstallPrompt'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
      </Routes>
      <PWAInstallPrompt />
    </BrowserRouter>
  )
}