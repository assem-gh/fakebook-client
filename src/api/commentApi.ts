import { createAsyncThunk, EntityId } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import { CommentType } from '../store/types';
import { CreateCommentPayload, DeleteComment, UpdateComment } from './types';

const getPostComments = createAsyncThunk<CommentType[], EntityId, any>(
  'comment/all',
  async (postId, thunkApi) => {
    try {
      const { data } = await api.get<CommentType[]>(
        `/posts/${postId}/comments`
      );

      return data;
    } catch (err: any) {
      showNotification({
        message: err.message,
        color: 'red',
        autoClose: false,
      });

      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const createComment = createAsyncThunk<CommentType, CreateCommentPayload, any>(
  'comment/create',
  async (payload, thunkApi) => {
    try {
      const { data } = await api.post<CommentType>('/comments', payload);

      return data;
    } catch (err: any) {
      showNotification({
        message: err.message,
        color: 'red',
        autoClose: false,
      });

      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const deleteComment = createAsyncThunk<void, DeleteComment, any>(
  'comments/delete',
  async ({ commentId }, thunkApi) => {
    try {
      await api.delete<void>(`/comments/${commentId}`);
      showNotification({
        message: 'Comment Deleted successfully',
        color: 'green',
      });
    } catch (err: any) {
      showNotification({
        message: err.message,
        color: 'red',
      });
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const updateComment = createAsyncThunk<CommentType, UpdateComment, any>(
  'comments/update',
  async ({ content, commentId }, thunkApi) => {
    try {
      const { data } = await api.put<CommentType>(`/comments/${commentId}`, {
        content,
      });
      showNotification({
        message: 'Comment Updated successfully',
        color: 'green',
      });

      return data;
    } catch (err: any) {
      showNotification({
        message: err.message,
        color: 'red',
      });
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export default { getPostComments, createComment, deleteComment, updateComment };
