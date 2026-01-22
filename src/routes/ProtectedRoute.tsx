import { Navigate, Outlet, useLocation } from 'react-router-dom'

type TokenPayload = {
  token: string
  expiry: number
}

export default function ProtectedRoute() {
  const location = useLocation()

  const redirect = (path: string) => (
    <Navigate to={path} replace state={{ from: location }} />
  )

  try {
    const tokenRaw = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!tokenRaw) return redirect('/login')

    const { token, expiry }: TokenPayload = JSON.parse(tokenRaw)

    if (!token || Date.now() > expiry) {
      localStorage.clear()
      return redirect('/login')
    }

    if (location.pathname === '/') {
      return role === 'user'
        ? redirect('/user')
        : <Outlet />
    }

    if (location.pathname === '/user') {
      return role !== 'user'
        ? redirect('/')
        : <Outlet />
    }

    return <Outlet />
  } catch {
    localStorage.clear()
    return redirect('/login')
  }
}
