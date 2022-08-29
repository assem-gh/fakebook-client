import { useState } from 'react';

import { ActionIcon, Menu } from '@mantine/core';

import { TbDots, TbEdit } from 'react-icons/tb';
import { BsBookmarkPlus, BsBookmarkDash } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CreatePostModal } from '../CreatePost/CreatePostModal';
import postApi from '../../api/http/postApi';

interface Props {
  postId: string;
}
export const PostMenu = ({ postId }: Props) => {
  const [opened, setOpened] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const ownerId = useAppSelector(
    (state) => state.posts.entities[postId].owner.id
  );

  const userId = useAppSelector((state) => state.user.id);

  const savedByUser = useAppSelector((state) => state.posts.saved).includes(
    postId
  );

  const isOwner = ownerId === userId;

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(postApi.deletePost(postId));
  };

  const handleSave = () => {
    const action = savedByUser ? 'remove' : 'save';
    dispatch(postApi.savePost({ postId, action }));
  };

  return (
    <>
      <Menu
        size={200}
        placement='end'
        transition='pop-top-right'
        shadow='sm'
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
              savedByUser ? (
                <BsBookmarkDash size={18} />
              ) : (
                <BsBookmarkPlus size={18} />
              )
            }
          >
            {savedByUser ? 'Unsave' : 'Save'}
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
      {isOwner && (
        <CreatePostModal
          opened={openEditModal}
          setOpened={setOpenEditModal}
          id={postId}
        />
      )}
    </>
  );
};
