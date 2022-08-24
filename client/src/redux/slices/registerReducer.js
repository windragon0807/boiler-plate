import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerData = createAsyncThunk("register/registerData", async (inputData) => {
    const response = await axios.post("/api/users/register", inputData);
    return response.data;
});

export const RegisterSlice = createSlice({
    name: "register",
    initialState: {
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerData.fulfilled, (state, { payload }) => {
            console.log(payload);
            const { success } = payload;
            state.success = success;
        });
    },
});

export default RegisterSlice.reducer;
