import { Outlet } from 'react-router-dom';

import { Main } from '../components/Layout/Main';
import { ProfileHeader } from '../components/Profile/Header/ProfileHeader';
import { ProfileLinks } from '../components/Profile/Header/ProfileLinks';

export const Profile = () => {
  return (
    <Main>
      <ProfileHeader />
      <ProfileLinks />

      <Outlet />
    </Main>
  );
};
