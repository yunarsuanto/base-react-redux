import { configureStore } from '@reduxjs/toolkit'
import authState from '../features/auth/authState'

export const store = configureStore({
  reducer: {
    auth: authState,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch