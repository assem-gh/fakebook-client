import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Anchor,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6),
});

export const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    schema: zodResolver(loginSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group direction='column' grow>
        <TextInput
          required
          label='Email'
          placeholder='hello@mantine.dev'
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
        <Anchor<'a'>
          onClick={(event) => event.preventDefault()}
          href='#'
          size='xs'
          mr={6}
        >
          Forgot password?
        </Anchor>
      </Group>
      <Group>
        <Text color='dimmed' size='sm' align='center' my='xl' pl={10}>
          Do not have an account yet?{' '}
          <Anchor
            component='button'
            type='button'
            color='primary'
            onClick={() => navigate('/register')}
            size='xs'
          >
            Create account
          </Anchor>
        </Text>
      </Group>

      <Button type='submit' fullWidth size='sm' loaderPosition='left'>
        Login
      </Button>
    </form>
  );
};
