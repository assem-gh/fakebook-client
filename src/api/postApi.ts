import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import { PostType } from '../store/types';
import {
  CreatePostPayload,
  GetAllPayLoad,
  GetAllResponse,
  UpdatePostPayload,
} from './types';

const createPost = createAsyncThunk<PostType, CreatePostPayload, any>(
  'post/create',
  async (payload, thunkApi) => {
    try {
      const { data } = await api.post<PostType>('/posts', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      showNotification({
        message: 'Post created successfully',
        color: 'green',
      });

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

const getAllPosts = createAsyncThunk<GetAllResponse, GetAllPayLoad, any>(
  'posts/getAll',
  async (payload, thunkApi) => {
    try {
      const { data } = await api.get<GetAllResponse>('/posts', {
        params: { before: payload.before },
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

const updatePost = createAsyncThunk<PostType, UpdatePostPayload, any>(
  'posts/update',
  async (payload, thunkApi) => {
    try {
      const { data } = await api.put<PostType>(
        `/posts/${payload.id}`,
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      showNotification({
        message: 'Post updated successfully',
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

const likePost = createAsyncThunk<PostType, string, any>(
  'posts/like',
  async (postId, thunkApi) => {
    try {
      const { data } = await api.patch<PostType>('/posts/' + postId);
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

export default { createPost, getAllPosts, likePost, updatePost };
