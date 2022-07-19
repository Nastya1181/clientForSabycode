import { createSlice } from '@reduxjs/toolkit'
import { sabycodeApi } from '../../api/sabycodeApi'

const initialState = {
    userName: localStorage.getItem('userName') || "",
    accessToken: localStorage.getItem('accessToken') || "",
    isUserConnected: sessionStorage.getItem('isUserConnected') || ""
  }

  export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
      setUserName: (state, action) => {
        state.userName = action.payload
      },
      setAccessToken: (state, action) => {
        state.accessToken = action.payload
      },
      setIsUserConnected: (state, action) => {
        state.isUserConnected = action.payload
      },
      /* logout: () => initialState, */
    },
    extraReducers: (builder) => {
      builder.addMatcher(
        sabycodeApi.endpoints.login.matchFulfilled,
        (state, action) => {
          state.accessToken = action.payload;
        }
      );
    },
  })
  
  export const { setUserName, setAccessToken, setIsUserConnected } = authenticationSlice.actions;
  
  export default authenticationSlice.reducer;

  export const selectUserName = (state) => state.authentication.userName;
  export const selectAccessToken = (state) => state.authentication.accessToken;
  export const selectIsUserConnected = (state) => state.authentication.isUserConnected;