import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.aaaa = action.payload.token;
      console.log("authslice state");
      console.log(state.userInfo);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = '';
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
  },
});
export const { setCredentials, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
