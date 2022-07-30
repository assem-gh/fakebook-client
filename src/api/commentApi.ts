import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import { CommentType } from '../store/types';
import { CreateCommentPayload, DeleteComment } from './types';

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

export default { createComment, deleteComment };
