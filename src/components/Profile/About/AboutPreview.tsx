import { Group, Text } from '@mantine/core';

import { useAppSelector } from '../../../store/hooks';
import dayjs from "dayjs";

export const AboutPreview = () => {
  const { firstName, lastName, birthday, gender, bio, country } =
    useAppSelector((state) => state.profile);
  const email = useAppSelector((state) => state.user.email);

  return (
    <Group px='sm' direction='column' spacing={4} grow>
      <Group spacing={16} sx={{ height: '36px' }}>
        <Text
          sx={{ minWidth: '84px', textTransform: 'capitalize' }}
          weight={500}
        >
          First Name :
        </Text>
        <Text>{firstName}</Text>
      </Group>

      <Group spacing={16} sx={{ height: '36px' }}>
        <Text
          sx={{ minWidth: '84px', textTransform: 'capitalize' }}
          weight={500}
        >
          Last Name :
        </Text>
        <Text>{lastName}</Text>
      </Group>

      <Group spacing={16} sx={{ height: '36px' }}>
        <Text
          sx={{ minWidth: '84px', textTransform: 'capitalize' }}
          weight={500}
        >
          Email :
        </Text>
        <Text>{email}</Text>
      </Group>

      <Group spacing={16} sx={{ height: '36px' }}>
        <Text
          sx={{ minWidth: '84px', textTransform: 'capitalize' }}
          weight={500}
        >
          Birthday :
        </Text>
        <Text>{dayjs(birthday).format("DD-MM-YYYY")}</Text>
      </Group>

      <Group spacing={16} sx={{ height: '36px' }}>
        <Text
          sx={{ minWidth: '84px', textTransform: 'capitalize' }}
          weight={500}
        >
          Gender :
        </Text>
        <Text>{gender}</Text>
      </Group>

      <Group spacing={16} sx={{ height: '36px' }}>
        <Text
          sx={{ minWidth: '84px', textTransform: 'capitalize' }}
          weight={500}
        >
          Country :
        </Text>
        <Text>{country}</Text>
      </Group>

      <Group spacing={16} sx={{ height: '36px' }}>
        <Text
          sx={{ minWidth: '84px', textTransform: 'capitalize' }}
          weight={500}
        >
          Bio :
        </Text>
        <Text>{bio}</Text>
      </Group>
    </Group>
  );
};
