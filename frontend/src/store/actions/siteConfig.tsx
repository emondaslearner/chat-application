/* eslint-disable  object-shorthand */

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define the initial state type
interface SiteConfigState {
    chatOpened: boolean;
}

const initialState: SiteConfigState = {
    chatOpened: false
}

const siteConfig = createSlice({
    name: "siteConfig",
    initialState,
    reducers: {
        changeChatOpenedVar(state, action: PayloadAction<boolean>) {
            state.chatOpened = action.payload
        }
    }
})

export const { changeChatOpenedVar } = siteConfig.actions
export default siteConfig.reducer
