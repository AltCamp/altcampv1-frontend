import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = JSON.parse(localStorage.getItem('user'));
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    setUserBio: (state, action) => {
      state.user.user.bio = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setProfilePicture: (state, action) => {
      state.user.user.profilePicture = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setUpdateDetails: (state, action) => {
      state.user.user.firstName = action.payload.firstName;
      state.user.user.lastName = action.payload.lastName;
      state.user.user.track = action.payload.track;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const {
  setUser,
  removeUser,
  setUserBio,
  setProfilePicture,
  setUpdateDetails,
} = userSlice.actions;

export default userSlice.reducer;
