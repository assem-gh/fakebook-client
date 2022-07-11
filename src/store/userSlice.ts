import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './types';
import userApi from '../api/userApi';

const initialState: UserState = {
  id: '',
  token: '',
  email: '',
  userName: '',
  firstName: '',
  lastName: '',
  profileImage: '',
  birthday: '',
  gender: 'male',
  verified: false,
  jwtToken: '',
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
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
