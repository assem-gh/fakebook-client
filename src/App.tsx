import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useToggle } from '@mantine/hooks';

import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import userApi from './api/http/userApi';
import { useAppDispatch } from './store/hooks';
import { NotificationsPage } from './pages/NotificationsPage';

function App() {
  const [colorScheme, toggleColorScheme] = useToggle<'dark' | 'light'>('dark', [
    'light',
    'dark',
  ]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userApi.authenticateUser());
  }, []);

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
            <Route path='/feeds' element={<Home type='feed' />} />
            <Route path='/saved-posts' element={<Home type='saved' />} />
            <Route path='/favorite-posts' element={<Home type='liked' />} />
            <Route path='/notifications' element={<NotificationsPage />} />
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
