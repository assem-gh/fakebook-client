import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Group, Paper, Text, TextInput } from '@mantine/core';

import { getThemeColor } from '../../utils/fns';

const labels = ['First Name', 'Last Name', 'Email', 'Birthday', 'Address'];

export const AboutSection = () => {
  const [edit, setEdit] = useState(false);

  return (
    <Paper shadow='xs' p='sm' radius='md'>
      <Group direction='column' grow>
        <Group position='apart'>
          <Text size='md' weight={600} py='sm'>
            Personal Info
          </Text>
          <Button
            variant='light'
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </Button>
        </Group>
        {edit ? (
          <Form setEdit={setEdit} labels={labels} />
        ) : (
          <Preview labels={labels} />
        )}
      </Group>
    </Paper>
  );
};

interface PreviewProps {
  labels: string[];
}

const Preview = ({ labels }: PreviewProps) => {
  const values = [
    'John',
    'Doe',
    'john@mail.com',
    '01.01.1900',
    'city, country',
  ];

  return (
    <Group px='sm' direction='column' grow>
      {labels.map((label, i) => {
        const value = values[i];
        return (
          <Group key={label} spacing={16} sx={{ height: '36px' }}>
            <Text sx={{ minWidth: '84px' }} weight={600}>
              {label}
            </Text>
            <Text>{value}</Text>
          </Group>
        );
      })}
    </Group>
  );
};

interface FormProps {
  labels: string[];
  setEdit: Dispatch<SetStateAction<boolean>>;
}

const Form = ({ labels, setEdit }: FormProps) => {
  return (
    <form>
      <Group px='sm' direction='column' grow>
        {labels.map((label, i) => {
          return (
            <Group spacing={16} sx={{ height: '36px' }}>
              <Text sx={{ minWidth: '84px' }} weight={600}>
                {label}
              </Text>
              <TextInput
                sx={(theme) => ({
                  flexGrow: 1,
                })}
                styles={(theme) => ({
                  input: {
                    backgroundColor: getThemeColor(theme, 5),
                    borderColor: getThemeColor(theme, 4, 4),
                    borderRadius: theme.radius.md,
                  },
                })}
              />
            </Group>
          );
        })}

        <Group position='right'>
          <Button onClick={() => setEdit(false)} variant='outline'>
            Cancel
          </Button>
          <Button onClick={() => {}}>Submit</Button>
        </Group>
      </Group>
    </form>
  );
};
