import { EntityId } from '@reduxjs/toolkit';
import { z } from 'zod';

import { loginSchema } from '../../components/Login/LoginForm';
import { registerSchema } from '../../components/Login/RegisterForm';
import { resetSchema } from '../../components/Login/ResetPasswordForm';
import {NotificationType, PostType, ProfileType,  UserType} from '../../store/types';

type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterArgs = Omit<RegisterSchema, 'birthday'> & {
  birthday: string;
};


export interface RegisterResponse {
  user: UserType ;
  jwtToken: string;
}

export type LoginArgs = z.infer<typeof loginSchema>;

export type ResetArgs = z.infer<typeof resetSchema> & { token: string };

export interface AuthenticateResponse extends RegisterResponse {
  notifications: NotificationType[];
  savedPostsIds: string[];
  feeds: {
    posts: PostType[];
    hasNext: boolean;
    next: string;
  };
}

export interface CreatePostArgs {
  content: string;
  images: File[];
}

export interface UpdatePostArgs extends CreatePostArgs {
  links: string[];
  id: EntityId;
}

export interface SavePostArgs {
  postId: EntityId;
  action: 'save' | 'remove';
}

export interface LikePostArgs {
  postId: EntityId;
  action: 'like' | 'unlike';
}

export type PostGroup = 'feeds' | 'saved' | 'liked' | 'owned';

export interface GetPostsArgs {
  before?: string;
  take?: number;
  offset?: number;
  group: PostGroup;
}

export interface GetPostsResponse {
  posts: PostType[];
  next: string;
  hasNext: boolean;
}

export interface CreateCommentArgs {
  content: string;
  postId: string;
}

export interface DeleteComment {
  commentId: EntityId;
  postId: EntityId;
}

export interface UpdateComment {
  commentId: EntityId;
  content: string;
}
export interface UpdateProfile {
  profileId: string;
  firstName:string,
  lastName:string,
  email:string,
  country:string,
  birthday: string,
  gender:'male'|'female'|'other',
  bio:string,

}
export interface UpdateProfileResponse extends ProfileType{
user:{
  id:string,
  email:string,
  userName:string
}

}
export interface  UpdateImageArgs{
  image:FormData;
  profileId:string;
  imageType:string
}
