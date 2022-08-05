import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';

import { socketMiddleware } from './middleware/socketMiddleware';
import { commentReducer } from './slices/commentSlice';
import { postReducer } from './slices/postSlice';
import { profileReducer } from './slices/profileSlice';
import { userReducer } from './slices/userSlice';

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
