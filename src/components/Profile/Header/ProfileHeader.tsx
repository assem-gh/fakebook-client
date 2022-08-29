import {
  Avatar,
  Box,
  createStyles,
  Group,
  Indicator,
  Paper,
  Text,
} from '@mantine/core';

import { useAppSelector } from '../../../store/hooks';
import { getThemeColor } from '../../../utils/fns';
import { ProfileMeta } from './ProfileMeta';

const useStyles = createStyles((theme) => ({
  paper: {
    position: 'relative',
  },
  coverImage: {
    height: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
  },

  avatarContainer: {
    backgroundColor: getThemeColor(theme, 8, 0),
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.shadows.lg,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 148,
  },
}));

interface Props {}

const bgImage =
  'http://www.thewowstyle.com/wp-content/uploads/2015/01/facebook-cover-balloons-sunset-view-facebook-cover.jpg';

export const ProfileHeader = ({}: Props) => {
  const user = useAppSelector((state) => state.user);
  const isConnected = false;

  const { classes } = useStyles();

  return (
    <Paper shadow='xs' px={0} radius='md' className={classes.paper}>
      <Box
        sx={{ backgroundImage: `url(${bgImage})` }}
        className={classes.coverImage}
      ></Box>

      <div className={classes.wrapper}>
        <Box className={classes.avatarContainer} p={2}>
          <Indicator
            inline
            size={20}
            offset={14}
            position='bottom-end'
            color={isConnected ? 'green' : 'gray'}
            withBorder
          >
            <Avatar src={user.profileImage} size={120} radius={120} />
          </Indicator>
        </Box>

        <Group direction='column' position='center' spacing={0} mt={24} mb={8}>
          <Text align='center' size='xl' weight={700} mb={-4}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
          <Text align='center' size='sm' color='dimmed'>
            City - Country
          </Text>
        </Group>
        <ProfileMeta />
      </div>
    </Paper>
  );
};
