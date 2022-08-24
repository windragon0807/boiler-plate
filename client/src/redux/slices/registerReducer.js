import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerData = createAsyncThunk("register/registerData", async (inputData) => {
    const response = await axios.post("/api/users/register", inputData);
    return response.data;
});

export const RegisterSlice = createSlice({
    name: "register",
    initialState: {
        loginSuccess: false,
        userId: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerData.fulfilled, (state, { payload }) => {
            console.log(payload);
            // const { loginSuccess, userId } = payload;
            // state.loginSuccess = loginSuccess;
            // state.userId = userId;
        });
    },
});

export const {} = RegisterSlice.actions;

export default RegisterSlice.reducer;
