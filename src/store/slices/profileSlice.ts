import {
  createSelector,
  createSlice,
  EntityId,
  isAnyOf,
} from '@reduxjs/toolkit';

import { ProfileState } from '../types';
import postApi from '../../api/http/postApi';
import { RootState } from '../store';
import userApi from '../../api/http/userApi';

const initialState: ProfileState = {
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
      state.savedPosts = action.payload;
    });
    builder.addCase(postApi.likePost.fulfilled, (state, action) => {
      const postId = action.payload.id;
      if (state.likedPosts.some((post) => post === postId)) {
        state.likedPosts = state.likedPosts.filter((post) => post !== postId);
      } else state.likedPosts.push(postId as string);
    });
    builder.addMatcher(
      isAnyOf(
        userApi.signin.fulfilled,
        userApi.signup.fulfilled,
        userApi.authenticateUser.fulfilled
      ),
      (state, action) => {
        state.likedPosts = action.payload.likedPostsIds;
        state.savedPosts = action.payload.savedPostsIds;
      }
    );
  },
});

export const selectSavedPost = createSelector(
  (state: RootState, id: EntityId) =>
    state.profile.savedPosts.findIndex((post) => post === id) >= 0,
  (isSaved) => isSaved
);

export const selectLikedPost = createSelector(
  (state: RootState, id: EntityId) =>
    state.profile.likedPosts.findIndex((post) => post === id) >= 0,
  (isLiked) => isLiked
);

export const {} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
