import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Anchor,
  Divider,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import userApi from '../../api/http/userApi';
import { useAppDispatch } from '../../store/hooks';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6),
});

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    schema: zodResolver(loginSchema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      await dispatch(userApi.signin(values)).unwrap();
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <Text size='xl' weight={600} align='center' color='indigo'>
        Welcome back
      </Text>
      <Divider labelPosition='center' my='lg' />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group direction='column' grow>
          <TextInput
            required
            label='Email'
            placeholder='Your Email address'
            {...form.getInputProps('email')}
          />
          <PasswordInput
            required
            label='Password'
            placeholder='Your password'
            {...form.getInputProps('password')}
          />
        </Group>

        <Group position='right' mt='xs'>
          <Anchor component={Link} to='/forgot-password' size='xs' mr={6}>
            Forgot password?
          </Anchor>
        </Group>
        <Group>
          <Text color='dimmed' size='sm' align='center' my='xl' pl={10}>
            Do not have an account yet?{' '}
            <Anchor component={Link} to='/register' color='primary' size='xs'>
              Create account
            </Anchor>
          </Text>
        </Group>

        <Button
          loading={loading}
          type='submit'
          fullWidth
          size='sm'
          loaderPosition='left'
        >
          Login
        </Button>
      </form>
    </>
  );
};
