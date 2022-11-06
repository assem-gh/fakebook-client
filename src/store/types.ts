import { PostGroup } from '../api/http/types';

export interface UserState {
  id: string;
  userName: string;
  email: string;
  isAuthenticated: boolean;
  jwtToken: string;
}

export interface UserType {
  id: string;
  userName: string;
  profile:ProfileType;
  email: string;
  isAuthenticated: boolean;
  jwtToken: string;
}

export interface ProfileType {
  id: string;
  gender: 'male' | 'female' | 'other';
  birthday: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  coverImage: string;
  city: string;
  country: string;
  bio: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserShort {
  id: string;
  userName: string;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
  };
}

export interface PostType {
  id: string;
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  owner: UserShort;
  commentsIds: string[];
  savedBy?: { id: string }[];
  likes?: UserShort[];
}

export interface PostState {
  entities: { [key: string]: PostType };
  next: {
    feeds: string;
    liked: number;
    owned: number;
    saved: number;
  };
  hasNext: Record<PostGroup, boolean>;
  feeds: string[];
  liked: string[];
  saved: string[];
  owned: string[];
}

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  owner: UserShort;
  postId: string;
}

export interface ProfileState {
  birthday: string;
  gender: 'male' | 'female' | 'other';
  bio: string;
  // friendsList: string[];
  // followingList: string[];
}

export enum NotificationLabel {
  Like = 'Post/like',
  Comment = 'Post/comment',
}

export interface NotificationType {
  id: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;

  label: NotificationLabel;
  data: {
    sender: {
      id: string;
      userName: string;
      profileImage: string;
      firstName: string;
      lastName: string;
    };
    count?: number;
    relatedEntityId: string;
  };
}
