import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { queryClient } from '../../app/queryClient'
import axiosClient from '../../app/axiosClient'
import { Meta } from '../../types/response'
import { AuthDataState } from '../../types/auth'

interface AuthState {
  data: AuthDataState | null
  meta: Meta | null
  isAuthenticated: boolean
  token: string | null
}

const initialState: AuthState = {
  data: null,
  meta: null,
  isAuthenticated: false,
  token: null,
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
      state.token = null
      state.isAuthenticated = false
      queryClient.clear();
      localStorage.removeItem('token')
    },
    getToken: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      } else {
        state.token = null;
        state.isAuthenticated = false;
      }
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      // buat loading
    })
    .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ meta: Meta, data: AuthDataState }>) => {
      state.token = action.payload.data.access_token
      state.isAuthenticated = true
      state.meta = action.payload.meta
      state.data = action.payload.data
      localStorage.setItem('token', action.payload.data.access_token)
    })
    .addCase(loginUser.rejected, (state, action) => {
      // state.loading = false
      // state.error = action.payload as string
    })
  },
})

export const { getToken, logout } = authState.actions
export default authState.reducer
