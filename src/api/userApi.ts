import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from './types';
import { StorageKey } from '../utils/localStorage';

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

    const { jwtToken, ...user } = data;

    localStorage.setItem(StorageKey.USER, JSON.stringify(user));
    localStorage.setItem(StorageKey.JWT, JSON.stringify(jwtToken));

    return data;
  } catch (error: any) {
    showNotification({
      message: error.message,
      color: 'red',
    });
    return thunkApi.rejectWithValue(error.message);
  }
});

const signin = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: any }
>('user/signin', async (payload, thunkApi) => {
  try {
    const { data } = await api.post<LoginResponse>('/users/signin', payload);
    console.log('Login Response', data);

    showNotification({
      message: 'successfully logged-in ',
      color: 'green',
    });

    const { jwtToken, ...user } = data;

    localStorage.setItem(StorageKey.USER, JSON.stringify(user));
    localStorage.setItem(StorageKey.JWT, JSON.stringify(jwtToken));

    return data;
  } catch (error: any) {
    showNotification({
      message: error.message,
      color: 'red',
    });
    return thunkApi.rejectWithValue(error.message);
  }
});

export default { signup, signin };
