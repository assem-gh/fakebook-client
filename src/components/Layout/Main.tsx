import { ReactNode, useState } from 'react';

import { Container, createStyles } from '@mantine/core';

import { AppHeader } from './Header';
import { LeftSideBar } from './LeftSideBar';
import { MobileNav } from './MobileNav';
import { RightSideBar } from './RightSideBar';

const useStyles = createStyles((theme) => ({
  main: {
    padding: `36px 112px`,
    [theme.fn.smallerThan('md')]: {
      paddingRight: '30px',
    },
    [theme.fn.smallerThan('xs')]: {
      padding: '36px 12px',
    },
  },
}));

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  const [opened, setOpened] = useState(false);

  const { classes } = useStyles();

  return (
    <>
      <AppHeader open={opened} setOpen={setOpened} />
      <MobileNav opened={opened} setOpened={setOpened} />
      <LeftSideBar />
      <Container size='md' mx={'auto'} className={classes.main}>
        {children}
      </Container>
      <RightSideBar />
    </>
  );
};
