/* eslint-disable  object-shorthand */

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    chatOpened: false
}

const siteConfig = createSlice({
    name: "siteConfig",
    initialState,
    reducers: {
        changeChatOpenedVar(state, action) {
            state.chatOpened = action.payload
        }
    }
})

export const {
    changeChatOpenedVar
} = siteConfig.actions
export default siteConfig.reducer
