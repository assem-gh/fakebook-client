import { MantineTheme } from '@mantine/core';
import { NotificationLabel } from '../store/types';

export const getThemeColor = (
  theme: MantineTheme,
  dark?: number,
  gray?: number
) => {
  if (theme.colorScheme === 'dark') {
    return typeof dark !== 'undefined' ? theme.colors.dark[dark] : theme.black;
  }
  return typeof gray !== 'undefined' ? theme.colors.gray[gray] : theme.white;
};

export const formatMessage = (label: NotificationLabel, count?: number) => {
  const msgs = {
    [NotificationLabel.Like]:
      count && count > 1
        ? ' and ' + count + ' others liked your post.'
        : ' liked your post.',
    [NotificationLabel.Comment]: ' comment on your post.',
  };

  return msgs[label];
};
