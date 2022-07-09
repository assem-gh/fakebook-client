import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Anchor,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { SetStateAction } from 'react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6),
});

interface LoginFormProps {
  toggle: (value?: SetStateAction<string> | undefined) => void;
}

export const LoginForm = ({ toggle }: LoginFormProps) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    schema: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <Group direction='column' grow>
        <TextInput
          required
          label='Email'
          placeholder='hello@mantine.dev'
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue('email', event.currentTarget.value)
          }
          error={form.errors.email}
        />

        <PasswordInput
          required
          label='Password'
          placeholder='Your password'
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue('password', event.currentTarget.value)
          }
          error={form.errors.password}
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
            onClick={() => toggle()}
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
