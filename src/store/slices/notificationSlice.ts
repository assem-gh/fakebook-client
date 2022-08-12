import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import NotificationApi from '../../api/http/NotificationApi';
import userApi from '../../api/http/userApi';

import { RootState } from '../store';
import { NotificationType } from '../types';

const notificationAdapter = createEntityAdapter<NotificationType>({
  selectId: (notification) => notification.id,
  sortComparer: (a, b) => (a.createdAt > b.createdAt ? -1 : 1),
});

const notificationSlice = createSlice({
  name: 'profile',
  initialState: notificationAdapter.getInitialState(),
  reducers: {
    addNotification: (state, action) => {
      notificationAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userApi.authenticateUser.fulfilled, (state, action) => {
      notificationAdapter.addMany(state, action.payload.notifications);
    });
    builder.addCase(NotificationApi.updateStatus.fulfilled, (state, action) => {
      notificationAdapter.upsertOne(state, action.payload);
    });
  },
});

export const {
  selectIds: selectNotificationsIds,
  selectById: selectNotificationById,
  selectEntities: selectNotificationEntities,
  selectAll,
} = notificationAdapter.getSelectors((state: RootState) => state.notifications);

export const selectUnreadNotificationsIds = createSelector(
  selectAll,
  (notifications) => notifications.flatMap((n) => (n.isRead ? [] : n.id))
);

export const { addNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
