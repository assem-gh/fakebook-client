import { useState } from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { TbDots } from 'react-icons/tb';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import commentApi from '../../api/commentApi';

interface Props {
  ownerId: string;
  commentId: string;
  postId: string;
}
export const CommentMenu = ({ ownerId, commentId, postId }: Props) => {
  const [opened, setOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const userId = useAppSelector((state) => state.user.id);

  const isOwner = ownerId === userId;
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(commentApi.deleteComment({ commentId, postId }));
  };

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
