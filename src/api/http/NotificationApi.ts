import { createAsyncThunk, EntityId } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';

import { api } from '.';
import { NotificationType } from '../../store/types';

const updateStatus = createAsyncThunk(
  'notification/update',
  async (id: EntityId, thunkApi) => {
    try {
      const { data } = await api.patch<NotificationType>(
        '/notifications/' + id
      );
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

export default { updateStatus };
