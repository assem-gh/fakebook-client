import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import postApi from '../../api/http/postApi';
import commentApi from '../../api/http/commentApi';
import { PostState, PostType } from '../types';
import userApi from '../../api/http/userApi';
import { logout } from './userSlice';

const sortIds = (ids: string[], posts: { [key: string]: PostType }) => {
  return ids.sort((a, b) => (posts[a].createdAt > posts[b].createdAt ? -1 : 1));
};

const initialState: PostState = {
  entities: {},
  next: {
    feeds: new Date().toISOString(),
    liked: 0,
    owned: 0,
    saved: 0,
  },
  hasNext: {
    feeds: true,
    liked: true,
    owned: true,
    saved: false,
  },
  feeds: [],
  saved: [],
  liked: [],
  owned: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout, (state, action) => {
      return initialState;
    });

    builder.addCase(postApi.createPost.fulfilled, (state, action) => {});

    builder.addCase(postApi.getPosts.fulfilled, (state, action) => {
      const { group } = action.meta.arg;

      const ids = action.payload.posts.map((post) => post.id);
      for (const post of action.payload.posts) {
        state.entities[post.id] = post;
      }

      state[group] = sortIds([...state[group], ...ids], state.entities);

      if (group !== 'saved') {
        state.hasNext[group] = action.payload.hasNext;
        group === 'feeds'
          ? (state.next[group] = action.payload.next)
          : (state.next[group] = parseInt(action.payload.next)) || -1;
      }
    });

    builder.addCase(postApi.likePost.fulfilled, (state, action) => {
      const { postId, action: likeAction } = action.meta.arg;
      state.entities[postId] = action.payload;
      state.liked =
        likeAction === 'like'
          ? sortIds([...state.liked, postId as string], state.entities)
          : state.liked.filter((id) => id !== postId);
    });

    builder.addCase(postApi.updatePost.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      state.entities[updatedPost.id] = updatedPost;
    });

    builder.addCase(postApi.deletePost.fulfilled, (state, action) => {
      const deletedPostId = action.meta.arg;
      delete state.entities[deletedPostId];
      state.feeds = state.feeds.filter((id) => id !== deletedPostId);
      state.owned = state.owned.filter((id) => id !== deletedPostId);
      state.liked = state.liked.filter((id) => id !== deletedPostId);
    });

    builder.addCase(postApi.savePost.fulfilled, (state, action) => {
      const { action: saveAction, postId } = action.meta.arg;
      state.saved =
        saveAction === 'save'
          ? sortIds([...state.saved, postId as string], state.entities)
          : state.saved.filter((id) => id !== postId);
    });

    builder.addCase(commentApi.createComment.fulfilled, (state, action) => {
      state.entities[action.payload.postId]?.commentsIds.push(
        action.payload.id
      );
    });

    builder.addCase(commentApi.deleteComment.fulfilled, (state, action) => {
      const { postId, commentId } = action.meta.arg;
      const post = state.entities[postId];
      post.commentsIds = post?.commentsIds.filter((id) => id !== commentId);
    });

    builder.addMatcher(
      isAnyOf(userApi.authenticateUser.fulfilled, userApi.signin.fulfilled),
      (state, action) => {
        const { feeds, savedPostsIds } = action.payload;
        const feedsIds = feeds.posts.map((post) => post.id);

        for (const post of action.payload.feeds.posts) {
          state.entities[post.id] = post;
        }
        state.saved = savedPostsIds;
        state.feeds = feedsIds;
        state.next.feeds = feeds.next;
        state.hasNext.feeds = feeds.hasNext;
      }
    );
  },
});

export const {} = postSlice.actions;
export const postReducer = postSlice.reducer;
