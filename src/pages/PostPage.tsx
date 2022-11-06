import {useNavigate, useParams} from 'react-router-dom';

import {Group, Text, UnstyledButton} from '@mantine/core';
import {TbArrowLeft} from 'react-icons/tb';

import {Main} from '../components/Layout/Main';
import {Post} from '../components/Post/Post';

export const PostPage = () => {
    const {postId} = useParams();
    const navigate = useNavigate();

    if (!postId) return null;

    return (
        <Main>
            <UnstyledButton
                onClick={() => navigate(-1)}
                mb='lg'
                sx={(theme) => ({'&:hover': {color: theme.colors.indigo[5]}})}
            >
                <Group spacing={8}>
                    <TbArrowLeft size={18}/>
                    <Text>Back</Text>
                </Group>
            </UnstyledButton>
            <Post postPage id={postId}/>
        </Main>
    );
};
