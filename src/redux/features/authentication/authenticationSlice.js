import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
  }

  export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
      setIsAuthenticated: (state, action) => {
        state.isAuthenticated = action.payload
      },
    },
  })
  
  export const { setIsAuthenticated } = authenticationSlice.actions;
  
  export default authenticationSlice.reducer;

  export const selectIsAuthenticated = (state) => state.authentication.isAuthenticated;
