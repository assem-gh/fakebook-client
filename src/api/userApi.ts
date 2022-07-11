import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import { RegisterPayload, RegisterResponse } from './types';

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
      message: 'successfully registered ',
      color: 'green',
    });

    const { jwtToken, ...user } = data;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('jwtToken', JSON.stringify(jwtToken));

    return data;
  } catch (error: any) {
    showNotification({
      message: error.message,
      color: 'red',
    });
    return thunkApi.rejectWithValue(error.message);
  }
});

export default { signup };
