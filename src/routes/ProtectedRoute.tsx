import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
  const location = useLocation()
  
  try {
    const tokenData = localStorage.getItem('token')
    if (!tokenData) {
      return <Navigate to="/login" replace state={{ from: location }} />
    }
    
    const { token, expiry } = JSON.parse(tokenData)
    
    // Cek apakah token sudah expired
    if (Date.now() > expiry) {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('role')
      return <Navigate to="/login" replace state={{ from: location }} />
    }
    
    if (!token) {
      return <Navigate to="/login" replace state={{ from: location }} />
    }
  } catch (error) {
    // Jika parsing gagal, hapus token dan redirect ke login
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('role')
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
