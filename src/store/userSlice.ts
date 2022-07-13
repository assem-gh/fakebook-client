import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './types';
import userApi from '../api/userApi';
import { loadState, StorageKey } from '../utils/localStorage';

const user = loadState(StorageKey.USER);
const jwtToken = loadState(StorageKey.JWT);

const initialState: UserState =
  jwtToken && user
    ? { ...user, jwtToken }
    : {
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
    builder.addCase(userApi.signin.fulfilled, (state, action) =>
      Object.assign(state, action.payload)
    );
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
