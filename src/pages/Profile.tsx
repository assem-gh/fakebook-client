import { Outlet } from 'react-router-dom';

import { Main } from '../components/Layout/Main';
import { ProfileHeader } from '../components/Profile/Header/ProfileHeader';
import { ProfileTabs } from '../components/Profile/Header/ProfileTabs';

export const Profile = () => {
  return (
    <Main>
      <ProfileHeader />
      <ProfileTabs />

      <Outlet />
    </Main>
  );
};
