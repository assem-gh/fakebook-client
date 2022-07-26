import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { PostType } from './types';
import postApi from '../api/postApi';

const postsAdapter = createEntityAdapter<PostType>({
  selectId: (post) => post.id,
});

const postSlice = createSlice({
  name: 'post',
  initialState: postsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postApi.createPost.fulfilled, (state, action) => {
      postsAdapter.addOne(state, action.payload);
    });
  },
});

export const {} = postSlice.actions;
export const postReducer = postSlice.reducer;
