import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { UserState } from '../types';
import userApi from '../../api/http/userApi';

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
    builder.addCase(
      userApi.signup.fulfilled,
      (state, action) =>
        (state = {
          ...action.payload.user,
          isAuthenticated: false,
        })
    );
    builder.addCase(userApi.authenticateUser.rejected, (state, action) => {
      return initialState;
    });
    builder.addMatcher(
      isAnyOf(userApi.authenticateUser.fulfilled, userApi.signin.fulfilled),
      (state, action) => {
        return (state = {
          ...action.payload.user,
          isAuthenticated: true,
        });
      }
    );
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;