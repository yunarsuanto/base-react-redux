import { useAppSelector, useAppDispatch } from './app/hook'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './app/queryClient'
// import { useProducts } from './features/products/useProducts'
import { ProductForm } from './components/ProductForm'
import { getToken, loginUser, logout } from './features/auth/authSlice'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
  const { user, isAuthenticated, token } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  // const { data, isLoading } = useProducts()

  const handleLogin = () => {
    dispatch(loginUser({ username: 'mor_2314', password: '83r5^_' }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }


  useEffect(() => {
  if (!token) {
    dispatch(getToken())
  } else {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}, [token]);

  if (!isAuthenticated)
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login Dulu</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  )

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Welcome {user}</h1>
        <button onClick={handleLogout}>Logout</button>

        <hr />

        <ProductForm />

        <h3>Product List</h3>
        {/* {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data?.map((p) => (
              <li key={p.id}>
                {p.title} - ${p.price}
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </QueryClientProvider>
  )
}

export default App
