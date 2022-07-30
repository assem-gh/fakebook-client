import { useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { ActionIcon, Menu } from '@mantine/core';
import { TbDots } from 'react-icons/tb';

import { useAppSelector } from '../../store/hooks';

interface Props {
  ownerId: EntityId;
  commentId: EntityId;
}
export const CommentMenu = ({ ownerId, commentId }: Props) => {
  const [opened, setOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const userId = useAppSelector((state) => state.user.id);

  const isOwner = ownerId === userId;

  const handleDelete = () => {};

  return (
    <>
      <Menu
        size={180}
        placement='end'
        transition='pop-top-right'
        onClose={() => setOpened(false)}
        onOpen={() => setOpened(true)}
        closeOnItemClick={true}
        control={
          <ActionIcon>
            <TbDots size={16} />
          </ActionIcon>
        }
      >
        {isOwner && (
          <>
            <Menu.Item onClick={() => setEditMode(true)}>Edit</Menu.Item>
            <Menu.Item onClick={handleDelete}>Delete</Menu.Item>
          </>
        )}
      </Menu>
    </>
  );
};
