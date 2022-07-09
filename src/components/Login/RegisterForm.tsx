import { SetStateAction } from 'react';
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
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';

const registerSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  birthday: z
    .date()
    .refine((val) => dayjs(new Date()).diff(val, 'years', true) > 13, {
      message: 'Age should be 13 ot more',
    }),
  gender: z.enum(['Male', 'Female', 'other']),
  password: z.string().min(6),
});

interface RegisterFormProps {
  toggle: (value?: SetStateAction<string> | undefined) => void;
}

export const RegisterForm = ({ toggle }: RegisterFormProps) => {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthday: dayjs(new Date()).toDate(),
      gender: 'Male',
    },
    schema: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <Group direction='column' grow>
        <TextInput
          required
          label='First Name'
          placeholder='John'
          {...form.getInputProps('firstName')}
          error={form.errors.firstName}
        />
        <TextInput
          required
          label='Last Name'
          placeholder='Doe'
          {...form.getInputProps('lastName')}
          error={form.errors.lastName}
        />
        <TextInput
          required
          label='Email'
          placeholder='hello@mail.com'
          {...form.getInputProps('email')}
          error={form.errors.email}
        />

        <PasswordInput
          required
          label='Password'
          placeholder='Your password'
          {...form.getInputProps('password')}
          error={form.errors.password}
        />
        <DatePicker
          placeholder='Pick date'
          label='Birthday'
          inputFormat='DD/MM/YYYY'
          labelFormat='MM/YYYY'
          {...form.getInputProps('birthday')}
          error={form.errors.birthday}
          required
        />
        <RadioGroup
          label='Select your Gender'
          {...form.getInputProps('gender')}
          required
          size='sm'
        >
          <Radio value='Male' label='Male' />
          <Radio value='Female' label='Female' />
          <Radio value='Other' label='Other' />
        </RadioGroup>
      </Group>

      <Group position='left' mt='lg'>
        <Anchor
          component='button'
          type='button'
          color='primary'
          onClick={() => toggle()}
          size='xs'
        >
          Already registered? Login
        </Anchor>
      </Group>

      <Button type='submit' fullWidth size='sm' loaderPosition='left' mt='xl'>
        Register
      </Button>
    </form>
  );
};
