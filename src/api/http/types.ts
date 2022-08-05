import { EntityId } from '@reduxjs/toolkit';
import { z } from 'zod';

import { loginSchema } from '../../components/Login/LoginForm';
import { registerSchema } from '../../components/Login/RegisterForm';
import { resetSchema } from '../../components/Login/ResetPasswordForm';
import { PostType, ProfileState, UserState } from '../../store/types';

type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterArgs = Omit<RegisterSchema, 'birthday'> & {
  birthday: string;
};

interface GetInitialUserPosts {
  savedPostsIds: string[];
  likedPostsIds: string[];
}

export interface RegisterResponse {
  user: UserState;
  jwtToken: string;
  savedPostsIds: string[];
  likedPostsIds: string[];
}

export type LoginArgs = z.infer<typeof loginSchema>;

export type LoginResponse = RegisterResponse;

export type ResetArgs = z.infer<typeof resetSchema> & { token: string };

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

export interface GetAllArgs {
  before?: string;
  take?: number;
}

export interface GetAllResponse {
  posts: PostType[];
  next: string;
  end: boolean;
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

export interface GetUserPostsArgs {
  queryType: 'saved' | 'liked' | 'owned' | 'initial';
  offset?: number;
  limit?: number;
  userId: string;
}

export type GetUserPostsResponse = PostType[];