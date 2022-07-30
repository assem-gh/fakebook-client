import { Aside, MediaQuery } from '@mantine/core';

import { AsideItem } from './Items/AsideItem';

export const AppAside = () => {
  return (
    <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
      <Aside width={{ xs: 64, md: 200 }} sx={{ border: 'none' }}>
        <AsideItem name='Test' />
        <AsideItem name='Test' />
        <AsideItem name='Test' />
      </Aside>
    </MediaQuery>
  );
};
