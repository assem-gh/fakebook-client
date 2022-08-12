import { EntityId } from '@reduxjs/toolkit';

import { NotificationLabel } from '../../store/types';

export interface NotificationData {
  relatedEntityId: string;
  count: number;
  sender: {
    id: string;
    profileImage: string;
    userName: string;
    firstName: string;
    lastName: string;
  };
}

export interface Data {
  relatedEntityId: EntityId;
  label: NotificationLabel;
}
