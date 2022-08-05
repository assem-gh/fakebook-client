import { createAsyncThunk, EntityId } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import { PostType } from '../../store/types';
import {
  CreatePostArgs,
  GetAllArgs,
  GetAllResponse,
  SavePostArgs,
  UpdatePostArgs,
} from './types';

const createPost = createAsyncThunk<PostType, CreatePostArgs, any>(
  'post/create',
  async (args, thunkApi) => {
    try {
      const { data } = await api.post<PostType>('/posts', args, {
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

const getAllPosts = createAsyncThunk<GetAllResponse, GetAllArgs, any>(
  'posts/getAll',
  async (args, thunkApi) => {
    try {
      const { data } = await api.get<GetAllResponse>('/posts', {
        params: { before: args.before },
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

const updatePost = createAsyncThunk<PostType, UpdatePostArgs, any>(
  'posts/update',
  async (args, thunkApi) => {
    try {
      const { data } = await api.put<PostType>(`/posts/${args.id}`, args, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

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

const likePost = createAsyncThunk<PostType, EntityId, any>(
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

const deletePost = createAsyncThunk<void, EntityId, any>(
  'posts/delete',
  async (postId, thunkApi) => {
    try {
      await api.delete<void>(`/posts/${postId}`);
      showNotification({
        message: 'Post Deleted successfully',
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

const savePost = createAsyncThunk<string[], SavePostArgs, any>(
  'posts/save',
  async ({ postId }, thunkApi) => {
    try {
      const { data } = await api.post<string[]>(`/posts/${postId}`);
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

export default {
  createPost,
  getAllPosts,
  likePost,
  updatePost,
  deletePost,
  savePost,
};
