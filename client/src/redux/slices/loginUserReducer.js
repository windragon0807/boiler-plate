import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const LoginUserSlice = createSlice({
    name: "loginUser",
    initialState: {},
    reducers: {
        setLoginUser: (state, { payload }) => {
            const request = axios
                .post("/api/users/login", payload)
                .then((response) => response.data);
            console.log(request);
            state = { ...state, request };
        },
    },
});

export const { setLoginUser } = LoginUserSlice.actions;
export default LoginUserSlice.reducer;
