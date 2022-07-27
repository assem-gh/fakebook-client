import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { PostType } from './types';
import postApi from '../api/postApi';
import { RootState } from './store';

const postsAdapter = createEntityAdapter<PostType>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => (a.updatedAt > b.updatedAt ? -1 : 1),
});

const postSlice = createSlice({
  name: 'post',
  initialState: postsAdapter.getInitialState({
    before: new Date().toISOString(),
    end: false,
    loading: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postApi.createPost.fulfilled, (state, action) => {
      postsAdapter.addOne(state, action.payload);
    });
    builder.addCase(postApi.getAllPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postApi.getAllPosts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(postApi.getAllPosts.fulfilled, (state, action) => {
      postsAdapter.addMany(state, action.payload.posts);
      state.before = action.payload.next;
      state.end = action.payload.end;
      state.loading = false;
    });
  },
});

const postsSelectors = postsAdapter.getSelectors<RootState>(
  (state) => state.posts
);

export const { selectById, selectIds, selectEntities, selectTotal } =
  postsSelectors;

export const {} = postSlice.actions;
export const postReducer = postSlice.reducer;
