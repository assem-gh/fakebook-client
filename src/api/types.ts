import { z } from 'zod';

import { loginSchema } from '../components/Login/LoginForm';
import { registerSchema } from '../components/Login/RegisterForm';

type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterPayload = Omit<RegisterSchema, 'birthday'> & {
  birthday: string;
};

export type RegisterResponse = Omit<RegisterPayload, 'password'> & {
  id: string;
  jwtToken: string;
};

export type LoginPayload = z.infer<typeof loginSchema>;

export type LoginResponse = RegisterResponse;
