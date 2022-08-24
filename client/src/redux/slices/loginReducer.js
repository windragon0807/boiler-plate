import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginData = createAsyncThunk("login/loginData", async (inputData) => {
    const response = await axios.post("/api/users/login", inputData);
    return response.data;
});

export const LoginSlice = createSlice({
    name: "login",
    initialState: {
        loginSuccess: false,
        userId: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginData.fulfilled, (state, { payload }) => {
            console.log(payload);
            const { loginSuccess, userId } = payload;
            state.loginSuccess = loginSuccess;
            state.userId = userId;
        });
    },
});

export const {} = LoginSlice.actions;
export default LoginSlice.reducer;
