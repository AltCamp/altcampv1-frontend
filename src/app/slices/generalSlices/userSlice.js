import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  token: JSON.parse(localStorage.getItem('token')),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = JSON.parse(localStorage.getItem('user'));
    },
    setToken: (state, action) => {
      localStorage.setItem('token', JSON.stringify(action.payload));
      state.token = JSON.parse(localStorage.getItem('token'));
    },
    removeUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setVerified: (state, action) => {
      state.user.emailIsVerified = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setUserBio: (state, action) => {
      state.user.bio = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setProfilePicture: (state, action) => {
      state.user.profilePicture = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setUpdateDetails: (state, action) => {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.track = action.payload.track;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const {
  setUser,
  setToken,
  setVerified,
  removeUser,
  setUserBio,
  setProfilePicture,
  setUpdateDetails,
} = userSlice.actions;

export default userSlice.reducer;
