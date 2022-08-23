import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginData = createAsyncThunk("login/loginData", async (data) => {
    const response = await axios.post("/api/users/login", data);
    return response.data;
});

export const LoginUserSlice = createSlice({
    name: "login",
    initialState: {
        loginSuccess: false,
        userId: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginData.fulfilled, (state, { payload }) => {
            // const navigate = useNavigate();
            console.log(payload);
            const { loginSuccess, userId } = payload;
            state.loginSuccess = loginSuccess;
            state.userId = userId;
            if (loginSuccess) {
                // navigate("/");
            }
        });
    },
});

export const {} = LoginUserSlice.actions;
export default LoginUserSlice.reducer;
