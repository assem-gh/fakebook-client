import { Drawer } from '@mantine/core';

import { Dispatch, ReactNode, SetStateAction } from 'react';

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  title: ReactNode;
  children: ReactNode;
}
export const MobileDrawer = ({ opened, setOpened, title, children }: Props) => {
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={title}
      size='full'
      padding={16}
      position='left'
    >
      {children}
    </Drawer>
  );
};
