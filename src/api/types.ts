import { z } from 'zod';

import { registerSchema } from '../components/Login/RegisterForm';

type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterPayload = Omit<RegisterSchema, 'birthday'> & {
  birthday: string;
};

export type RegisterResponse = Omit<RegisterPayload, 'password'> & {
  id: string;
  jwtToken: string;
};
