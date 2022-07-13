import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './features/authentication/authenticationSlice.js'
export const rootStore = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
})