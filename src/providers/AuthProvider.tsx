import { createContext, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

type AuthContextType = {
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()

  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  if (!isAuthenticated && location.pathname !== '/login') {
    navigate('/login', { replace: true })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
