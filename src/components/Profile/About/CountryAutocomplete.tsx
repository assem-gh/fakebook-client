import { Group, SelectItemProps, Text, Autocomplete } from '@mantine/core';
import axios from 'axios';
import { forwardRef, useState } from 'react';
import { getThemeColor } from '../../../utils/fns';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const CountryAutoComplete = ({ onChange, value }: Props) => {
  const [data, setData] = useState([]);

  const handleChange = async (v: string) => {
    onChange(v);

    if (v.length > 2) {
      const where = encodeURIComponent(
        JSON.stringify({
          name: {
            $regex: `^${v}`,
            $options: 'i',
          },
        })
      );

      const API_KEY = import.meta.env.VITE_COUNTRY_API_KEY;
      const API_ID = import.meta.env.VITE_COUNTRY_API_ID;
      const API_URL = import.meta.env.VITE_COUNTRY_API_URL;

      const res = await axios.get(API_URL + where, {
        headers: {
          'X-Parse-Application-Id': API_ID,
          'X-Parse-Master-Key': API_KEY,
        },
      });

      setData(() =>
        res.data.results.map((country: any) => ({
          emoji: country.emoji,
          value: country.name,
        }))
      );
    }
  };

  return (
    <Autocomplete
      onChange={handleChange}
      value={value}
      data={data}
      sx={{ flexGrow: 1 }}
      itemComponent={AutoCompleteItem}
      styles={(theme) => ({
        input: {
          backgroundColor: getThemeColor(theme, 4),
        },
      })}
    />
  );
};

interface ItemProps extends SelectItemProps {
  emoji: string;
  value: string;
}

export const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, emoji, ...others }: ItemProps, ref) => {
    if (!value) return null;

    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          {emoji && <Text>{emoji} </Text>}
          <Text>{value}</Text>
        </Group>
      </div>
    );
  }
);
