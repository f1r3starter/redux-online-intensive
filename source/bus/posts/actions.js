// Types
import { types } from "./types";

export const postsActions = {
    // Sync
    fillPosts: (posts) => {
        return {
            type:    types.FILL_POSTS,
            payload: posts,
        };
    },
    createPost: (post) => {
        return {
            type:    types.CREATE_POST,
            payload: post,
        };
    },
    clearPosts: () => {
        return {
            type: types.CLEAR_POSTS,
        };
    },
    removePost: (postId) => {
        return {
            type:    types.REMOVE_POST,
            payload: postId,
        };
    },
    likePost: (likedPostData) => {
        return {
            type:    types.LIKE_POST,
            payload: likedPostData,
        };
    },
    unlikePost: (unlikedPostData) => {
        return {
            type:    types.UNLIKE_POST,
            payload: unlikedPostData,
        };
    },

    // Async
    fetchPostsAsync: () => {
        return {
            type: types.FETCH_POSTS_ASYNC,
        };
    },
    createPostAsync: (post) => {
        return {
            type:    types.CREATE_POST_ASYNC,
            payload: post,
        };
    },
    removePostAsync: (postId) => {
        return {
            type:    types.REMOVE_POST_ASYNC,
            payload: postId,
        };
    },
    likePostAsync: (postId) => {
        return {
            type:    types.LIKE_POST_ASYNC,
            payload: postId,
        };
    },
    unlikePostAsync: (postId) => {
        return {
            type:    types.UNLIKE_POST_ASYNC,
            payload: postId,
        };
    },
};
