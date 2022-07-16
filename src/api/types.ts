import { z } from 'zod';

import { loginSchema } from '../components/Login/LoginForm';
import { registerSchema } from '../components/Login/RegisterForm';
import { resetSchema } from '../components/Login/ResetPasswordForm';

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

export type ResetPayload = z.infer<typeof resetSchema> & { token: string };
