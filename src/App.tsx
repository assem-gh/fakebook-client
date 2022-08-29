import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useToggle } from '@mantine/hooks';

import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import userApi from './api/http/userApi';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { NotificationsPage } from './pages/NotificationsPage';
import { BackToTop } from './components/BackToTop';
import { Profile } from './pages/Profile';
import { TimeLineSection } from './components/Profile/TimeLineSection';
import { AboutSection } from './components/Profile/AboutSection';
import { FriendsSection } from './components/Profile/FriendsSection';
import { GlobalStyles } from './GlobalStyles';
import { AppStyles, AppTheme } from './AppTheme';
import { PostPage } from './pages/PostPage';

const AuthRoutes = () => {
  const token = useAppSelector((state) => state.user.jwtToken);
  return token ? <Outlet /> : <Navigate to='accounts/login' />;
};

function App() {
  const [colorScheme, toggleColorScheme] = useToggle<'dark' | 'light'>('dark', [
    'light',
    'dark',
  ]);

  const token = useAppSelector((state) => state.user.jwtToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(userApi.authenticateUser(navigate));
    }
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
            <Route path='/accounts'>
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
            </Route>

            <Route path='/' element={<AuthRoutes />}>
              <Route index element={<Navigate to='posts/newsfeed' />} />
              <Route path='/posts'>
                <Route index element={<Navigate to='posts/newsfeed' />} />
                <Route path='newsfeed' element={<Home group='feeds' />} />
                <Route path='saved' element={<Home group='saved' />} />
                <Route path='favorites' element={<Home group='liked' />} />
                <Route path=':postId' element={<PostPage />} />
              </Route>

              <Route path='/notifications' element={<NotificationsPage />} />

              <Route
                path=':username/photos/'
                element={<div>Photos page</div>}
              />

              <Route path='/:userName/profile' element={<Profile />}>
                <Route index element={<Navigate to='about' />} />
                <Route path='about' element={<AboutSection />} />
                <Route path='timeline' element={<TimeLineSection />} />
                <Route path='friends' element={<FriendsSection />} />
              </Route>
            </Route>
          </Routes>
          <BackToTop />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
