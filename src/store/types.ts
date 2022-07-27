export interface UserState {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  token: string;
  profileImage: string;
  verified: boolean;
  jwtToken: string;
}

interface UserShort {
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
}
