import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { useForm, zodResolver } from '@mantine/form';
import {
  PasswordInput,
  Button,
  Group,
  Anchor,
  Center,
  Box,
} from '@mantine/core';
import { TbArrowLeft } from 'react-icons/tb';

import userApi from '../../api/userApi';

export const resetSchema = z.object({
  newPassword: z.string().min(6),
});

export const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = useParams().token || '';

  const form = useForm({
    initialValues: {
      newPassword: '',
    },
    schema: zodResolver(resetSchema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    await userApi.resetPassword({ ...values, token });
    setLoading(false);
    navigate('/login');
  };

  return (
    <>
      <Anchor
        color='dimmed'
        size='sm'
        component={Link}
        align='left'
        to='/login'
      >
        <Center inline>
          <TbArrowLeft size={12} />
          <Box ml={5}>Back to login page</Box>
        </Center>
      </Anchor>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group direction='column' grow my='xl'>
          <PasswordInput
            required
            label='New Password'
            placeholder='Your new password'
            {...form.getInputProps('newPassword')}
          />
        </Group>
        <Button
          mt='lg'
          loading={loading}
          type='submit'
          fullWidth
          size='sm'
          loaderPosition='left'
        >
          Reset password
        </Button>
      </form>
    </>
  );
};
