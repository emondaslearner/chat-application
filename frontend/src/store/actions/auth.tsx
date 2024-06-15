/* eslint-disable  object-shorthand */

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define the initial state type
interface InitialStates {
    name: string;
    email: string;
    profile_picture: string;
}

// Define the payload type for the setData action
interface UserDataPayload {
    name: string;
    email: string;
    profile_picture: string;
}

const initialState: InitialStates = {
    name: '',
    email: '',
    profile_picture: ''
}

const siteConfig = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserDataPayload>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.profile_picture = action.payload.profile_picture;
        }
    }
})

export const { setUserData } = siteConfig.actions;
export default siteConfig.reducer;
