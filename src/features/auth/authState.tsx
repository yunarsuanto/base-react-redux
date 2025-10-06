import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { queryClient } from '../../app/queryClient'
import axiosClient from '../../app/axiosClient'

interface AuthState {
  user: string | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('general_auth.GeneralAuthHandler/Login', credentials)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed')
    }
  }
)

const authState = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      queryClient.clear();
    },
    getToken: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
        state.user = 'user'; // bisa disesuaikan, misal simpan username di localStorage juga
      } else {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
      state.loading = false
      state.token = action.payload.token
      state.isAuthenticated = true
      state.user = 'user'
      localStorage.setItem('token', action.payload.token)
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { getToken, logout } = authState.actions
export default authState.reducer
