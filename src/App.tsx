import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useToggle } from '@mantine/hooks';

import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import userApi from './api/http/userApi';
import { useAppDispatch } from './store/hooks';
import { NotificationsPage } from './pages/NotificationsPage';
import { BackToTop } from './components/BackToTop';
import { Profile } from './pages/Profile';
import { TimeLine } from './components/Profile/TimeLine';
import { About } from './components/Profile/About';
import { ProfileFriendsList } from './components/Profile/ProfileFriendsList';
import { GlobalStyles } from './GlobalStyles';
import { AppStyles, AppTheme } from './AppTheme';
import { PostPage } from './pages/PostPage';

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
        withNormalizeCSS
        styles={AppStyles}
        theme={{ colorScheme: colorScheme, ...AppTheme }}
      >
        <GlobalStyles />
        <NotificationsProvider position='top-center' autoClose={4000}>
          <Routes>
            <Route path='feeds' element={<Home type='feed' />} />
            <Route path='saved-posts' element={<Home type='saved' />} />
            <Route path='favorite-posts' element={<Home type='liked' />} />
            <Route path='posts/:postId' element={<PostPage />} />
            <Route path='notifications' element={<NotificationsPage />} />
            <Route path=':userName/profile' element={<Profile />}>
              <Route index element={<Navigate to='about' />} />
              <Route path='about' element={<About />} />
              <Route path='timeline' element={<TimeLine />} />
              <Route path='friends' element={<ProfileFriendsList />} />
            </Route>
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
          <BackToTop />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
