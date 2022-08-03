import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ResetPayload,
} from './types';

const authenticateUser = createAsyncThunk('user/auth', async (_, thunkApi) => {
  try {
    const { data } = await api.post<RegisterResponse>('/users/auth');

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
  RegisterPayload,
  {
    rejectValue: any;
  }
>('user/register', async (payload, thunkApi) => {
  try {
    const { data } = await api.post<RegisterResponse>('/users/signup', payload);
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

const signin = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: any }
>('user/signin', async (payload, thunkApi) => {
  try {
    const { data } = await api.post<LoginResponse>('/users/signin', payload);
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
});

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

export const resetPassword = async (args: ResetPayload) => {
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

export default {
  authenticateUser,
  signup,
  signin,
  forgotPassword,
  resetPassword,
};
