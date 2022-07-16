import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import dayjs from 'dayjs';

import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Anchor,
  RadioGroup,
  Radio,
  Divider,
  Text,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';

import userApi from '../../api/userApi';
import { useAppDispatch } from '../../store/hooks';

export const registerSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  birthday: z
    .date()
    .refine((val) => dayjs(new Date()).diff(val, 'years', true) > 13, {
      message: 'Age should be 13 ot more',
    }),
  gender: z.enum(['male', 'female', 'other']),
  password: z.string().min(6),
});

interface RegisterFormProps {}

export const RegisterForm = ({}: RegisterFormProps) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthday: new Date(),
      gender: 'male',
    },
    schema: zodResolver(registerSchema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      const birthday = dayjs(values.birthday).format('DD-MM-YYYY');
      const formData = { ...values, birthday };
      await dispatch(userApi.signup(formData)).unwrap();
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <Text size='xl' weight={600} align='center' color='blue'>
        Welcome to Fakebook
      </Text>
      <Divider labelPosition='center' my='lg' />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group direction='column' grow>
          <TextInput
            required
            label='First Name'
            placeholder='Your first name'
            {...form.getInputProps('firstName')}
          />
          <TextInput
            required
            label='Last Name'
            placeholder='Your Last name'
            {...form.getInputProps('lastName')}
          />
          <TextInput
            required
            label='Email'
            placeholder='Your Email Address'
            {...form.getInputProps('email')}
          />

          <PasswordInput
            required
            label='Password'
            placeholder='Your password'
            {...form.getInputProps('password')}
          />
          <DatePicker
            placeholder='Pick date'
            label='Birthday'
            inputFormat='DD/MM/YYYY'
            labelFormat='MM/YYYY'
            {...form.getInputProps('birthday')}
            required
          />
          <RadioGroup
            label='Select your Gender'
            {...form.getInputProps('gender')}
            required
            size='sm'
          >
            <Radio value='male' label='Male' />
            <Radio value='female' label='Female' />
            <Radio value='other' label='Other' />
          </RadioGroup>
        </Group>

        <Group position='left' mt='lg'>
          <Anchor component={Link} to='/login' color='primary' size='xs'>
            Already registered? Login
          </Anchor>
        </Group>

        <Button
          type='submit'
          fullWidth
          size='sm'
          loaderPosition='left'
          mt='xl'
          loading={loading}
        >
          Register
        </Button>
      </form>
    </>
  );
};
