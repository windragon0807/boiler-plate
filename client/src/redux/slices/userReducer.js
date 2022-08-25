import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🏷️ 회원가입 전처리
export const signUp = createAsyncThunk("user/signUp", async (inputData) => {
    const response = await axios.post("/api/users/register", inputData);
    return response.data;
});
// 🏷️ 로그인 전처리
export const signIn = createAsyncThunk("user/signIn", async (inputData) => {
    const response = await axios.post("/api/users/login", inputData);
    return response.data;
});
// 🏷️ 동기화된 유저 상태 받아오기
export const fetchAuth = createAsyncThunk("user/fetchAuth", async () => {
    const response = await axios.get("/api/users/auth");
    return response.data;
});
// 🏷️ 로그아웃 전처리
export const logout = createAsyncThunk("user/logout", async () => {
    const response = await axios.get("/api/users/logout");
    return response.data;
});

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        _id: "",
        isAuth: false,
        name: "",
        email: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        // 🏷️ 회원가입 데이터 처리
        builder.addCase(signUp.fulfilled, (state, { payload }) => {
            console.log(payload);
            const { success } = payload;
            success
                ? console.log("🔅 Sign Up Success")
                : console.log(
                      " ⚠️ Sign Up Failure\n\n",
                      "❓ This email has already been registered."
                  );
        });
        // 🏷️ 로그인 데이터 처리
        builder.addCase(signIn.fulfilled, (state, { payload }) => {
            const { loginSuccess, message } = payload;
            loginSuccess
                ? console.log(`🔅 Sign In Success\n\n`, payload)
                : console.log(` ⚠️ Sign In Failure\n\n`, `❓ ${message}`);
        });
        // 🏷️ 유저 상태 데이터 처리
        builder.addCase(fetchAuth.fulfilled, (state, { payload }) => {
            console.log("⚙️ User information has been updated.\n\n", payload);
            const { _id, isAuth, name, email } = payload;
            if (isAuth) {
                state._id = _id;
                state.isAuth = isAuth;
                state.name = name;
                state.email = email;
            } else {
                state._id = "";
                state.isAuth = isAuth;
                state.name = "";
                state.email = "";
            }
        });
        // 🏷️ 로그아웃 데이터 처리
        builder.addCase(logout.fulfilled, (state, { payload }) => {
            const { success } = payload;
            success ? console.log("🔅 Logout Success") : console.log("⚠️ Logout Failure");
        });
    },
});

// 🏷️ 로그인하고 유저 상태 받아오기
export const signInAndAuth = (inputData) => async (dispatch) => {
    await dispatch(signIn(inputData));
    const {
        payload: { isAuth },
    } = await dispatch(fetchAuth());
    return isAuth;
};
// 🏷️ 로그아웃하고 유저 상태 받아오기
export const logoutAndAuth = () => async (dispatch) => {
    await dispatch(logout());
    const {
        payload: { isAuth },
    } = await dispatch(fetchAuth());
    return isAuth;
};

export default UserSlice.reducer;
