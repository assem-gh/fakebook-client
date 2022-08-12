import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import {
  LoginArgs,
  LoginResponse,
  RegisterArgs,
  RegisterResponse,
  ResetArgs,
  AuthenticateResponse,
} from './types';

const authenticateUser = createAsyncThunk('user/auth', async (_, thunkApi) => {
  try {
    const { data } = await api.get<AuthenticateResponse>('/users/auth');
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

// export const getUserPosts = createAsyncThunk<
//   GetPostsResponse,
//   GetUserPostsArgs,
//   { state: RootState }
// >('user/posts', async ({ queryType, offset, limit }, thunkApi) => {
//   try {
//     const userId = thunkApi.getState().user.id;
//     const { data } = await api.get<GetPostsResponse>(`/users/${userId}/posts`, {
//       params: {
//         queryType,
//         offset,
//         limit,
//       },
//     });
//     return data;
//   } catch (err: any) {
//     showNotification({
//       message: err.message,
//       color: 'red',
//     });
//     return thunkApi.rejectWithValue(err.message);
// //   }
// });

export default {
  authenticateUser,
  signup,
  signin,
  forgotPassword,
  resetPassword,
  // getUserPosts,
};
