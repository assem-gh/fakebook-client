import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { CommentType } from '../types';
import { RootState } from '../store';
import commentApi from '../../api/http/commentApi';
import { logout } from './userSlice';

const commentAdapter = createEntityAdapter<CommentType>({
  selectId: (comment) => comment.id,
  sortComparer: (a, b) => (a.createdAt > b.createdAt ? -1 : 1),
});

const initialState = commentAdapter.getInitialState({
  loading: false,
});

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(logout, (state, action) => {
      return initialState;
    });
    builder.addCase(commentApi.getPostComments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(commentApi.getPostComments.fulfilled, (state, action) => {
      commentAdapter.addMany(state, action.payload);
      state.loading = false;
    });
    builder.addCase(commentApi.getPostComments.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(commentApi.createComment.fulfilled, (state, action) => {
      commentAdapter.addOne(state, action.payload);
    });
    builder.addCase(commentApi.deleteComment.fulfilled, (state, action) => {
      commentAdapter.removeOne(state, action.meta.arg.commentId);
    });
    builder.addCase(commentApi.updateComment.fulfilled, (state, action) => {
      commentAdapter.upsertOne(state, action.payload);
    });
  },
});

const commentSelectors = commentAdapter.getSelectors<RootState>(
  (state) => state.comments
);

export const {
  selectById: selectCommentById,
  selectIds,
  selectEntities,
  selectTotal,
} = commentSelectors;

export const {} = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
