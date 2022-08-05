import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import {
  GetUserPostsArgs,
  GetUserPostsResponse,
  LoginArgs,
  LoginResponse,
  RegisterArgs,
  RegisterResponse,
  ResetArgs,
} from './types';
import { PostType } from '../../store/types';

const authenticateUser = createAsyncThunk('user/auth', async (_, thunkApi) => {
  try {
    const { data } = await api.post<RegisterResponse>('/users/auth');
    console.log(data);

    localStorage.setItem('jwtToken', data.jwtToken);

    return data;
  } catch (err: any) {
    showNotification({
      message: err.message,
      color: 'red',
    });
    return thunkApi.rejectWithValue(err.message);
  }
});

const signup = createAsyncThunk<
  RegisterResponse,
  RegisterArgs,
  {
    rejectValue: any;
  }
>('user/register', async (args, thunkApi) => {
  try {
    const { data } = await api.post<RegisterResponse>('/users/signup', args);
    showNotification({
      title: 'successfully registered ',
      message:
        'Verification Link sent to your email,please Open the link to verify your account.',
      color: 'green',
    });

    localStorage.setItem('jwtToken', data.jwtToken);

    return data;
  } catch (err: any) {
    showNotification({
      message: err.message,
      color: 'red',
    });
    return thunkApi.rejectWithValue(err.message);
  }
});

const signin = createAsyncThunk<LoginResponse, LoginArgs, { rejectValue: any }>(
  'user/signin',
  async (args, thunkApi) => {
    try {
      const { data } = await api.post<LoginResponse>('/users/signin', args);
      showNotification({
        message: 'successfully logged-in ',
        color: 'green',
      });

      localStorage.setItem('jwtToken', data.jwtToken);

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

export const forgotPassword = async (email: string) => {
  try {
    const res = await api.post<{ message: string }>('/users/forgot-password', {
      email,
    });
    if (res.status === 200) {
      showNotification({
        message: res.data.message,
        color: 'green',
        autoClose: false,
      });
    }
  } catch (err: any) {
    showNotification({
      message: err.message,
      color: 'red',
      autoClose: false,
    });
  }
};

export const resetPassword = async (args: ResetArgs) => {
  try {
    const res = await api.post<{ message: string }>(
      '/users/reset-password',
      args
    );
    if (res.status === 200) {
      showNotification({
        message: res.data.message,
        color: 'green',
        autoClose: false,
      });
    }
  } catch (err: any) {
    showNotification({
      message: err.message,
      color: 'red',
      autoClose: false,
    });
  }
};

export const getUserPosts = createAsyncThunk<
  GetUserPostsResponse,
  GetUserPostsArgs,
  any
>('user/posts', async ({ queryType, offset, limit, userId }, thunkApi) => {
  try {
    const { data } = await api.get<GetUserPostsResponse>(
      `/users/${userId}/posts`,
      {
        params: {
          queryType,
          offset,
          limit,
        },
      }
    );
    return data;
  } catch (err: any) {
    showNotification({
      message: err.message,
      color: 'red',
    });
    return thunkApi.rejectWithValue(err.message);
  }
});

export default {
  authenticateUser,
  signup,
  signin,
  forgotPassword,
  resetPassword,
  getUserPosts,
};
