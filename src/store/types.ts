export interface UserState {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  isAuthenticated: boolean;
  profileImage: string;
  verified: boolean;
  jwtToken: string;
}

export interface UserShort {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface PostType {
  id: string;
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  owner: UserShort;
  commentsIds: string[];
  likes?: UserShort[];
}

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  owner: UserShort;
  postId: string;
}

export interface Profile {
  birthday: string;
  gender: 'male' | 'female' | 'other';
  bio: string;
  savedPosts: PostType[];
  likedPosts: PostType[];
  // friendsList: string[];
  // followingList: string[];
}
