export enum NotificationType {
  Like = 'Post/like',
  Comment = 'Post/comment',
}

export interface NotificationData {
  relatedEntityId: string;
  count: number;
  sender: {
    id: string;
    profileImage: string;
    userName: string;
  };
  message: string;
}
