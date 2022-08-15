import { Link, useLocation, useParams } from 'react-router-dom';
import { Anchor, createStyles, Group, Paper } from '@mantine/core';

import { getThemeColor } from '../../../utils/fns';

const links = ['about', 'timeline', 'friends'];

const useStyles = createStyles((theme) => ({
  container: {},
  link: {
    textTransform: 'capitalize',
    color: getThemeColor(theme, 2, 7),
    flexGrow: 1,
    textAlign: 'center',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: getThemeColor(theme, 7, 1),
    },
  },
  active: {
    color: theme.colors.indigo[5],
  },
  middle: {
    borderLeft: `2px solid ${getThemeColor(theme, 5, 1)}`,
    borderRight: `2px solid ${getThemeColor(theme, 5, 1)}`,
  },
}));

export const ProfileLinks = () => {
  const { pathname } = useLocation();
  const { userName } = useParams();
  const { classes, cx, theme } = useStyles();
  return (
    <Paper withBorder radius={0} sx={{ backgroundColor: theme.colors.dark[9] }}>
      <Group className={classes.container} spacing={0}>
        {links.map((link, i) => (
          <Anchor
            key={link + i}
            component={Link}
            py='sm'
            to={link}
            className={cx(classes.link, {
              [classes.active]: pathname.endsWith(link),
              [classes.middle]: i === 1,
            })}
          >
            {link}
          </Anchor>
        ))}
      </Group>
    </Paper>
  );
};
