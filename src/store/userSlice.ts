import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './types';
import userApi from '../api/userApi';

const jwtToken = localStorage.getItem('jwtToken');

const initialState: UserState = {
  id: '',
  email: '',
  userName: '',
  firstName: '',
  lastName: '',
  profileImage: '',
  verified: false,
  jwtToken: jwtToken || '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userApi.signup.fulfilled, (state, action) =>
      Object.assign(state, action.payload)
    );
    builder.addCase(userApi.signin.fulfilled, (state, action) =>
      Object.assign(state, action.payload)
    );
    builder.addCase(userApi.authenticateUser.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.isAuthenticated = true;
    });
    builder.addCase(userApi.authenticateUser.rejected, (state, action) => {
      return initialState;
    });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
