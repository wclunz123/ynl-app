import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: "",
        token: "",
    },
    reducers: {
        login: (state, action) => {
            const { user, token } = action.payload;
            state.token = token;
            state.user = user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        }
    }
})

export const { login, logout } = authSlice.actions;

export const selectUser = (state) => state.user;
export const selectToken = (state) => state.token;

export default authSlice.reducer;
