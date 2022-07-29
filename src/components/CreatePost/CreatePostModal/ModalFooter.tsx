import { Dispatch } from 'react';

import { Group, ActionIcon, Button, Tooltip, Divider } from '@mantine/core';
import { MdVideoLibrary, MdPhotoLibrary } from 'react-icons/md';

import { ActionType, CreatePostAction } from '../createPostReducer';

interface FooterProps {
  dispatch: Dispatch<CreatePostAction>;
  handleSendPost: () => Promise<void>;
  edit: boolean;
}

export const ModalFooter = ({
  dispatch,
  handleSendPost,
  edit,
}: FooterProps) => {
  return (
    <Group position='apart'>
      <Group position='right' sx={{ flexGrow: 1 }}>
        <Tooltip label='Photos'>
          <ActionIcon
            onClick={() => dispatch({ type: ActionType.ShowDropzone })}
            radius='md'
            color='green'
            p={2}
          >
            <MdPhotoLibrary size={24} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label='Videos'>
          <ActionIcon radius='md' color='red' p={2}>
            <MdVideoLibrary size={24} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Divider orientation='vertical' sx={{ height: '36px' }} />

      <Button onClick={handleSendPost} size='sm'>
        {edit ? 'Save' : 'Post'}
      </Button>
    </Group>
  );
};
