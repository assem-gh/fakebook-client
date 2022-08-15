import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  createStyles,
  Group,
  Text,
} from '@mantine/core';

import { TbPencil } from 'react-icons/tb';

import { useAppSelector } from '../../../store/hooks';
import { getThemeColor } from '../../../utils/fns';
import { ProfileMeta } from './ProfileMeta';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: getThemeColor(theme, 7),
    borderRadius: '0',
  },
  coverImage: {
    height: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },

  avatar: {
    border: `2px solid ${getThemeColor(theme, 7)}`,

    marginTop: '-60px',
    [theme.fn.smallerThan('md')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '16px',
    paddingTop: '16px',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
      gap: '12px',
    },
  },
  edit: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    // display: 'none',
  },
}));

interface Props {}

const bgImage =
  'http://www.thewowstyle.com/wp-content/uploads/2015/01/facebook-cover-balloons-sunset-view-facebook-cover.jpg';

export const ProfileHeader = ({}: Props) => {
  const user = useAppSelector((state) => state.user);

  const { classes } = useStyles();

  return (
    <Card withBorder p='xl' pb='sm' className={classes.card}>
      <Card.Section
        sx={{ backgroundImage: `url(${bgImage})` }}
        className={classes.coverImage}
      >
        <ActionIcon variant='transparent' className={classes.edit}>
          <TbPencil color='white' size={48} />
        </ActionIcon>
      </Card.Section>
      <div className={classes.wrapper}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={user.profileImage}
            size={120}
            radius={120}
            className={classes.avatar}
          />
          <ActionIcon variant='transparent' className={classes.edit}>
            <TbPencil color='gray' size={48} />
          </ActionIcon>
        </Box>

        <Group direction='column' spacing={0}>
          <Text align='center' size='xl' weight={700}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
          <Text align='center' size='sm' color='dimmed'>
            location - city
          </Text>
          <Group spacing={8}>
            <Button>Follow</Button>
            <Button variant='outline'>Friend</Button>
          </Group>
        </Group>
        <ProfileMeta />
      </div>
    </Card>
  );
};
