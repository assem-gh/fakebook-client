import { createSlice } from '@reduxjs/toolkit';

import { PostType, ProfileState } from '../types';
import postApi from '../../api/http/postApi';

const initialState: ProfileState = {
  birthday: '',
  gender: 'male',
  bio: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
