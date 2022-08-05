import { Dispatch, SetStateAction, useState } from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { TbDots } from 'react-icons/tb';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import commentApi from '../../api/http/commentApi';

interface Props {
  commentId: string;
  postId: string;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

export const CommentMenu = ({ commentId, postId, setEdit }: Props) => {
  const [opened, setOpened] = useState(false);

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
        <Menu.Item onClick={() => setEdit(true)}>Edit</Menu.Item>
        <Menu.Item onClick={handleDelete}>Delete</Menu.Item>
      </Menu>
    </>
  );
};
