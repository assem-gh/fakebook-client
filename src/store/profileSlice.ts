import { createSlice } from '@reduxjs/toolkit';

import { Profile } from './types';
import postApi from '../api/postApi';

const initialState: Profile = {
  birthday: '',
  gender: 'male',
  bio: '',
  savedPosts: [],
  likedPosts: [],
  // friendsList: [],
  // followingList: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postApi.savePost.fulfilled, (state, action) => {
      // state.savedPosts = action.payload;
    });
  },
});

export const {} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
