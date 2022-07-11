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
