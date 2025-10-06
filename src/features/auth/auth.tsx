import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface AuthState {
  user: string | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

interface AuthResponse {
  token: string
}

// john_doe
// pass123
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (credentials:{username: string, password: string}) => {
    const response = await axios.post('https://fakestoreapi.com/auth/login', credentials)
    return response.data as AuthResponse
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Login Failed'
      })
  },

})

export const { logout } = authSlice.actions
export default authSlice.reducer
