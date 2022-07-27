import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import { PostType } from '../store/types';
import { CreatePostPayload, GetAllPayLoad, GetAllResponse } from './types';

const createPost = createAsyncThunk<
  PostType,
  CreatePostPayload,
  {
    rejectValue: any;
  }
>('post/create', async (payload, thunkApi) => {
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
});

const getAllPosts = createAsyncThunk<
  GetAllResponse,
  GetAllPayLoad,
  {
    rejectValue: any;
  }
>('posts/getAll', async (payload, thunkApi) => {
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
});
export default { createPost, getAllPosts };
