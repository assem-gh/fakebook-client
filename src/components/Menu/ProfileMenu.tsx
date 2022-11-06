import {ChangeEvent,  useState} from 'react';

import { Menu, createStyles, ActionIcon } from '@mantine/core';

import { TbDots } from 'react-icons/tb';
import { BsPersonCheckFill, BsPersonPlusFill } from 'react-icons/bs';
import { MdLibraryAdd, MdLibraryAddCheck } from 'react-icons/md';
import { RiImageEditFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

import { getThemeColor } from '../../utils/fns';
import userApi from "../../api/http/userApi";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

const useStyles = createStyles((theme) => ({
  menuBtn: {
    backgroundColor: getThemeColor(theme, 4, 2),
    height: '36px',
    color: getThemeColor(theme, 0, 8),
    '&:hover': {
      backgroundColor: getThemeColor(theme, 6, 3),
    },
  },
}));

export const ProfileMenu = () => {
  const [, setMenuOpened] = useState(false);
  const [, setLoading]=useState(false)

  const profileId=useAppSelector(state=>state.profile.id)

  const isOwner = true;
  const isFollow = true;
  const isFriend = true;

  const { classes } = useStyles();
  const dispatch=useAppDispatch()

  const handleClick=async (e:ChangeEvent<HTMLInputElement>)=>{
    try {
      if(e.target.files&&e.target.files[0]){
        const fd =new FormData()
        fd.append('image',e.target.files[0])
        setLoading(true)
        await dispatch(userApi.updateProfileImages({image:fd,profileId,imageType:e.target.id})).unwrap()
        setLoading(false)
        setMenuOpened(false)
      }
    }catch(err) {
      console.log(err)
      setLoading(false)
    }

  }

  return (
    <Menu
      size={200}
      placement='end'
      transition='pop-top-right'
      onClose={() => setMenuOpened(false)}
      onOpen={() => setMenuOpened(true)}
      closeOnItemClick={false}
      control={
        <ActionIcon size='lg' variant='filled' className={classes.menuBtn}>
          <TbDots size={16} />
        </ActionIcon>
      }
    >

      {isOwner ? (
        <>
          <Menu.Item icon={<RiImageEditFill size={14} />}>

            <label htmlFor='coverImage'>Edit Cover Image</label>
            <input
                id="coverImage"
                onChange={handleClick}
                type="file"
                hidden
                multiple={false}
            />
          </Menu.Item>
          <Menu.Item icon={<CgProfile size={14} />} >

            <label htmlFor='profileImage'> Edit Profile image</label>
            <input
                id="profileImage"
                onChange={handleClick}
                type="file"
                hidden
                multiple={false}
            />
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            icon={
              isFriend ? (
                <BsPersonCheckFill size={14} />
              ) : (
                <BsPersonPlusFill size={14} />
              )
            }
          >
            {isFriend ? 'cancel' : 'add'} Friend
          </Menu.Item>

          <Menu.Item
            icon={
              isFollow ? (
                <MdLibraryAddCheck size={14} />
              ) : (
                <MdLibraryAdd size={14} />
              )
            }
          >
            {isFollow ? 'unfollow' : 'Follow'}
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
