import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialStateDataTypes {
    posts: any
}

const initialState: initialStateDataTypes = {
    posts: []
}

const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, actions) => {
            state.posts = actions.payload;
        },
        addPostToState: (state, action) => {
            if (action.payload?._id !== state.posts?.[0]?._id) {
                state.posts = [action.payload, ...state.posts]
            }
        },
        increaseReactionCount: (state, action: PayloadAction<string>) => {
            const index = state.posts.findIndex((obj: any) => obj._id === action.payload);
            state.posts[index].reactionCount += 1;
        },
        decreaseReactionCount: (state, action: PayloadAction<string>) => {
            const index = state.posts.findIndex((obj: any) => obj._id === action.payload);
            state.posts[index].reactionCount -= 1;
        },
        setGivenReaction: (state, action: PayloadAction<{ _id: string; reaction: string }>) => {
            const index = state.posts.findIndex((obj: any) => obj._id === action.payload._id);
            state.posts[index] = {
                ...state.posts[index],
                givenReaction: action.payload.reaction
            };
        },
        setCommentCount: (state, action: PayloadAction<{ index: number; commentCount: number }>) => {
            state.posts[action.payload.index] = {
                ...state.posts[action.payload.index],
                commentCount: action.payload.commentCount || state.posts[action.payload.index].commentCount + 1
            };
        }
    }
})

export const { setPosts, addPostToState, increaseReactionCount, decreaseReactionCount, setGivenReaction, setCommentCount } = posts.actions;

export default posts.reducer