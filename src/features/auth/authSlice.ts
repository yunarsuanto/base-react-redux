import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './authTypes';
import { login } from '../../api/auth.api';
import { LoginSchema } from '../../schemas/login.schema';

// Definisikan async thunk untuk login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginSchema, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      return response.token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login Gagal');
    }
  }
);

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = 'succeeded';
        state.isAuthenticated = true;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearToken } = authSlice.actions;
export default authSlice.reducer;
