import {
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';

import NotificationApi from '../../api/http/NotificationApi';
import userApi from '../../api/http/userApi';

import { RootState } from '../store';
import { NotificationType } from '../types';
import { logout } from './userSlice';

const notificationAdapter = createEntityAdapter<NotificationType>({
  selectId: (notification) => notification.id,
  sortComparer: (a, b) => (a.createdAt > b.createdAt ? -1 : 1),
});

const initialState = notificationAdapter.getInitialState();

const notificationSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      notificationAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state, action) => {
      return initialState;
    });
    builder.addCase(NotificationApi.updateStatus.fulfilled, (state, action) => {
      notificationAdapter.upsertOne(state, action.payload);
    });
    builder.addMatcher(
      isAnyOf(userApi.authenticateUser.fulfilled, userApi.signin.fulfilled),
      (state, action) => {
        notificationAdapter.addMany(state, action.payload.notifications);
      }
    );
  },
});

export const {
  selectById: selectNotificationById,
  selectAll,
} = notificationAdapter.getSelectors((state: RootState) => state.notifications);

export const selectUnreadNotificationsIds = createSelector(
  selectAll,
  (notifications) => notifications.flatMap((n) => (n.isRead ? [] : n.id))
);

export const { addNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
