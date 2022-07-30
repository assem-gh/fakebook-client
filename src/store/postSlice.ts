import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { PostType } from './types';
import postApi from '../api/postApi';
import { RootState } from './store';
import commentApi from '../api/commentApi';

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
    builder.addCase(postApi.likePost.fulfilled, (state, action) => {
      postsAdapter.setOne(state, action.payload);
    });
    builder.addCase(postApi.updatePost.fulfilled, (state, action) => {
      postsAdapter.setOne(state, action.payload);
    });
    builder.addCase(postApi.deletePost.fulfilled, (state, action) => {
      postsAdapter.removeOne(state, action.meta.arg);
    });
    builder.addCase(commentApi.createComment.fulfilled, (state, action) => {
      state.entities[action.payload.post.id]?.comments.push(action.payload);
    });
    builder.addCase(commentApi.deleteComment.fulfilled, (state, action) => {
      const { postId, commentId } = action.meta.arg;
      const post = state.entities[postId] as PostType;
      post.comments = post?.comments.filter((c) => c.id !== commentId);
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
