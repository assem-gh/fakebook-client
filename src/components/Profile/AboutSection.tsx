import {   useState } from 'react';

import { Button, Group, Paper, Text } from '@mantine/core';

import { ProfileForm } from './About/AboutForm';
import { AboutPreview } from './About/AboutPreview';


export const AboutSection = () => {
  const [edit, setEdit] = useState(false);

  return (
    <Paper shadow='xs' p='sm' radius='md'>
      <Group direction='column' mb='xs' grow>
        <Group position='apart'>
          <Text size='md' weight={600} py='sm'>
            Personal Info
          </Text>
          {!edit && (
            <Button
              variant='outline'
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit
            </Button>
          )}
        </Group>
        {edit ? <ProfileForm setEdit={setEdit} /> : <AboutPreview />}
      </Group>
    </Paper>
  );
};
