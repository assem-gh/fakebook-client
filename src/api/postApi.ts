import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import { Post } from '../store/types';
import { CreatePostPayload } from './types';

const createPost = createAsyncThunk<
  Post,
  CreatePostPayload,
  {
    rejectValue: any;
  }
>('user/register', async (payload, thunkApi) => {
  try {
    const { data } = await api.post<Post>('/posts', payload, {
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

export default { createPost };
