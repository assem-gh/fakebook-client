import { useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';

import { ActionIcon, Menu } from '@mantine/core';
import { TbDots, TbEdit } from 'react-icons/tb';
import { BsBookmarkPlus, BsBookmarkDash } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectPostById } from '../../store/postSlice';
import { CreatePostModal } from '../CreatePost/CreatePostModal';
import postApi from '../../api/postApi';

interface Props {
  postId: EntityId;
}
export const PostMenu = ({ postId }: Props) => {
  const [opened, setOpened] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const ownerId = useAppSelector(
    (state) => selectPostById(state, postId)?.owner.id
  );
  const userId = useAppSelector((state) => state.user.id);
  const savedPosts = useAppSelector((state) => state.profile.savedPosts);

  const isOwner = ownerId === userId;

  const isSaved = savedPosts.some((p) => p === postId);

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(postApi.deletePost(postId));
  };

  const handleSave = () => {
    dispatch(postApi.savePost({ postId, action: isSaved ? 'remove' : 'save' }));
  };

  return (
    <>
      <Menu
        size={200}
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
        {!isOwner && (
          <Menu.Item
            onClick={handleSave}
            icon={
              isSaved ? (
                <BsBookmarkDash size={18} />
              ) : (
                <BsBookmarkPlus size={18} />
              )
            }
          >
            {isSaved ? 'Unsave' : 'Save'}
          </Menu.Item>
        )}
        {isOwner && (
          <>
            <Menu.Item
              icon={<TbEdit size={18} />}
              onClick={() => setOpenEditModal(true)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              icon={<MdDeleteOutline size={18} />}
              onClick={handleDelete}
            >
              Delete
            </Menu.Item>
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
