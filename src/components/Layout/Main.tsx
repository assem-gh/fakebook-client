import { ReactNode, useState } from 'react';

import { AppShell, Container } from '@mantine/core';

import { AppHeader } from './Header';
import { AppNavbar } from './AppNavbar';
import { AppAside } from './AppAside';
import { getThemeColor } from '../../utils/fns';

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={<AppNavbar opened={opened} />}
      aside={<AppAside />}
      header={<AppHeader open={opened} setOpen={setOpened} />}
      styles={(theme) => ({
        main: {
          border: `1px solid ${getThemeColor(theme, 5, 3)}`,
          borderTop: 'none',
          borderBottom: 'none',
          backgroundColor: getThemeColor(theme, 8, 0),
          [theme.fn.smallerThan('sm')]: {
            minHeight: 'calc(100vh - 56px)',
          },
        },
      })}
    >
      <Container size='lg' pb={48}>
        {children}
      </Container>
    </AppShell>
  );
};
