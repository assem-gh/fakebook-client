import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';

import { commentReducer } from './commentSlice';
import { postReducer } from './postSlice';
import { profileReducer } from './profileSlice';
import { socketMiddleware } from './socketMiddleware';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    comments: commentReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
