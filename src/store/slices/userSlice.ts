import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { UserState } from '../types';
import userApi from '../../api/http/userApi';

const jwtToken = localStorage.getItem('jwtToken');

const initialState: UserState = {
  id: '',
  email: '',
  userName: '',
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
    builder.addCase(userApi.authenticateUser.rejected, () => {
      return initialState;
    });
    builder.addCase(userApi.updateProfile.fulfilled, (state, action) => {
      const {user}=action.payload
      state.email=user.email
    });

    builder.addMatcher(
      isAnyOf(
        userApi.authenticateUser.fulfilled,
        userApi.signin.fulfilled,
        userApi.signup.fulfilled
      ),
      (state, action) => {
        return  {
          ...action.payload.user,
          isAuthenticated: true,
          jwtToken: action.payload.jwtToken,
        };
      }
    );
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
