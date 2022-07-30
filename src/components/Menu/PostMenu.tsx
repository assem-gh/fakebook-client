import { useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { ActionIcon, Menu } from '@mantine/core';
import { TbDots } from 'react-icons/tb';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CreatePostModal } from '../CreatePost/CreatePostModal';
import postApi from '../../api/postApi';

interface Props {
  ownerId: EntityId;
  postId: EntityId;
}
export const PostMenu = ({ ownerId, postId }: Props) => {
  const [opened, setOpened] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const userId = useAppSelector((state) => state.user.id);

  const isOwner = ownerId === userId;

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(postApi.deletePost(postId));
  };

  return (
    <>
      <Menu
        size={260}
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
        <Menu.Item>save</Menu.Item>
        {isOwner && (
          <>
            <Menu.Item onClick={() => setOpenEditModal(true)}>Edit</Menu.Item>
            <Menu.Item onClick={handleDelete}>Delete</Menu.Item>
          </>
        )}
      </Menu>
      <CreatePostModal
        opened={openEditModal}
        setOpened={setOpenEditModal}
        id={postId}
      />
    </>
  );
};
