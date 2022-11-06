import { z } from 'zod';

import {
  TextInput,
  Text,
  Group,
  Button,
  RadioGroup,
  Radio,
  Textarea,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import dayjs from 'dayjs';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import { Dispatch, SetStateAction } from 'react';
import { CountryAutoComplete } from './CountryAutocomplete';
import { DatePicker } from '@mantine/dates';
import userApi from "../../../api/http/userApi";

 const ProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  gender: z.enum(['male', 'female', 'other']),
  country: z.string(),
  birthday: z
    .date()
    .refine((val) => dayjs(new Date()).diff(val, 'years', true) > 13, {
      message: 'Age should be 13 ot more',
    }),
  bio: z.string(),
});

export type ProfileArgs =z.infer<typeof ProfileSchema>;

interface ProfileFormProps {
  setEdit: Dispatch<SetStateAction<boolean>>;
}

export const ProfileForm = ({ setEdit }: ProfileFormProps) => {
  const { firstName, lastName, birthday, gender, bio, country,id } =
    useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch()
  const email = useAppSelector((state) => state.user.email);


  const form = useForm<ProfileArgs>({
    initialValues: {
      firstName,
      lastName,
      email,
      country,
      birthday: new Date(birthday),
      gender,
      bio,
    },
    schema: zodResolver(ProfileSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    const birthday = dayjs(values.birthday).format('DD-MM-YYYY');
    dispatch(userApi.updateProfile({...values,birthday,profileId:id}))
    setEdit(false)
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group px='sm' spacing='xs' direction='column' grow>
        <Group spacing={24} sx={{ height: '36px' }}>
          <Text sx={{ minWidth: '84px' }} weight={500}>
            First Name :
          </Text>
          <TextInput
            sx={{ flexGrow: 1 }}
            required
            variant='default'
            placeholder='Your first name'
            {...form.getInputProps('firstName')}
          />
        </Group>

        <Group spacing={24} sx={{ height: '36px' }}>
          <Text sx={{ minWidth: '84px' }} weight={500}>
            Last Name :
          </Text>
          <TextInput
            sx={{ flexGrow: 1 }}
            required
            variant='default'
            placeholder='Your last name'
            {...form.getInputProps('lastName')}
          />
        </Group>

        <Group spacing={24} sx={{ height: '36px' }}>
          <Text sx={{ minWidth: '84px' }} weight={500}>
            Email :
          </Text>
          <TextInput
            sx={{ flexGrow: 1 }}
            required
            variant='default'
            placeholder='Your Email'
            {...form.getInputProps('email')}
          />
        </Group>

        <Group spacing={24} align='flex-start'>
          <Text sx={{ minWidth: '84px' }} weight={500}>
            Birthday :
          </Text>
          <DatePicker
            placeholder='Pick date'
            inputFormat='DD/MM/YYYY'
            labelFormat='MM/YYYY'
            {...form.getInputProps('birthday')}
            required
          />{' '}
        </Group>

        <Group spacing={24} sx={{ height: '36px' }}>
          <Text sx={{ minWidth: '84px' }} weight={500}>
            Gender :
          </Text>
          <RadioGroup {...form.getInputProps('gender')} required size='sm'>
            <Radio value='male' label='Male' />
            <Radio value='female' label='Female' />
            <Radio value='other' label='Other' />
          </RadioGroup>
        </Group>

        <Group spacing={24}>
          <Text sx={{ minWidth: '84px' }} weight={500}>
            Country :
          </Text>
          <CountryAutoComplete {...form.getInputProps('country')} />
        </Group>

        <Group spacing={24} align='flex-start'>
          <Text sx={{ minWidth: '84px' }} weight={500}>
            Bio :
          </Text>
          <Textarea
            sx={{ flexGrow: 1 }}
            required
            variant='default'
            minRows={3}
            autosize
            placeholder='Write something ...'
            {...form.getInputProps('bio')}
          />
        </Group>

        <Group position='right' mt='sm' mb='xs'>
          <Button onClick={() => setEdit(false)} variant='outline'>
            Cancel
          </Button>
          <Button type='submit'>Submit</Button>
        </Group>
      </Group>
    </form>
  );
};
