import { ReactNode, useState } from 'react';

import { AppShell } from '@mantine/core';

import { AppHeader } from '../Header/Header';
import { AppNavbar } from './AppNavbar';
import { AppAside } from './AppAside';

interface MainProps {
  children: ReactNode;
}
export const Main = ({ children }: MainProps) => {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      fixed
      navbar={<AppNavbar opened={opened} />}
      aside={<AppAside />}
      header={<AppHeader open={opened} setOpen={setOpened} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};
