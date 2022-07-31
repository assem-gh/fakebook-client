import { createSlice } from '@reduxjs/toolkit';

import { Profile } from './types';
import postApi from '../api/postApi';

const initialState: Profile = {
  id: '',
  birthday: '',
  gender: 'male',
  savedPosts: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postApi.savePost.fulfilled, (state, action) => {
      state.savedPosts = action.payload;
    });
  },
});

export const {} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
