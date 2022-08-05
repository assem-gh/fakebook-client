import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import {
  createStyles,
  Title,
  TextInput,
  Button,
  Anchor,
  Center,
  Box,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TbArrowLeft } from 'react-icons/tb';

import userApi from '../../api/http/userApi';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 14,
    fontWeight: 600,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export const forgotSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

export const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
    },
    schema: zodResolver(forgotSchema),
  });

  const { classes } = useStyles();

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    await userApi.forgotPassword(values.email);
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
      <Title mt='lg' className={classes.title} align='left'>
        Enter your email to get reset link:
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          my='lg'
          placeholder='Enter your Email'
          {...form.getInputProps('email')}
          required
        />

        <Button type='submit' fullWidth loading={loading}>
          Send reset link
        </Button>
      </form>
    </>
  );
};
