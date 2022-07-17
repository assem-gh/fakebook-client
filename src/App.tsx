import { Route, Routes } from 'react-router-dom';

import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useToggle } from '@mantine/hooks';

import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';

function App() {
  const [colorScheme, toggleColorScheme] = useToggle<'dark' | 'light'>('dark', [
    'light',
    'dark',
  ]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme: colorScheme,
          colors: {},
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position='top-center' autoClose={4000}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<LoginPage form='login' />} />
            <Route path='register' element={<LoginPage form='register' />} />
            <Route
              path='forgot-password'
              element={<LoginPage form='forgot' />}
            />
            <Route
              path='reset-password/:token'
              element={<LoginPage form='reset' />}
            />
          </Routes>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
