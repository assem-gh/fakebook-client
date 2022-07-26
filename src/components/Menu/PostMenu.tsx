import { ActionIcon, Menu } from '@mantine/core';
import { useState } from 'react';
import { TbDots } from 'react-icons/tb';

export const PostMenu = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Menu
      size={260}
      placement='end'
      transition='pop-top-right'
      onClose={() => setOpened(false)}
      onOpen={() => setOpened(true)}
      closeOnItemClick={false}
      control={
        <ActionIcon>
          <TbDots size={16} />
        </ActionIcon>
      }
    >
      <Menu.Item>save</Menu.Item>
    </Menu>
  );
};
