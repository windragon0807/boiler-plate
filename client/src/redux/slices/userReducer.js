import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// π·οΈ νμκ°μ μ μ²λ¦¬
export const signUp = createAsyncThunk("user/signUp", async (inputData) => {
    const response = await axios.post("/api/users/register", inputData);
    return response.data;
});
// π·οΈ λ‘κ·ΈμΈ μ μ²λ¦¬
export const signIn = createAsyncThunk("user/signIn", async (inputData) => {
    const response = await axios.post("/api/users/login", inputData);
    return response.data;
});
// π·οΈ λκΈ°νλ μ μ  μν λ°μμ€κΈ°
export const fetchAuth = createAsyncThunk("user/fetchAuth", async () => {
    const response = await axios.get("/api/users/auth");
    return response.data;
});
// π·οΈ λ‘κ·Έμμ μ μ²λ¦¬
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
        // π·οΈ νμκ°μ λ°μ΄ν° μ²λ¦¬
        builder.addCase(signUp.fulfilled, (state, { payload }) => {
            console.log(payload);
            const { success } = payload;
            success
                ? console.log("π Sign Up Success")
                : console.log(
                      " β οΈ Sign Up Failure\n\n",
                      "β This email has already been registered."
                  );
        });
        // π·οΈ λ‘κ·ΈμΈ λ°μ΄ν° μ²λ¦¬
        builder.addCase(signIn.fulfilled, (state, { payload }) => {
            const { loginSuccess, message } = payload;
            loginSuccess
                ? console.log(`π Sign In Success\n\n`, payload)
                : console.log(` β οΈ Sign In Failure\n\n`, `β ${message}`);
        });
        // π·οΈ μ μ  μν λ°μ΄ν° μ²λ¦¬
        builder.addCase(fetchAuth.fulfilled, (state, { payload }) => {
            console.log("βοΈ User information has been updated.\n\n", payload);
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
        // π·οΈ λ‘κ·Έμμ λ°μ΄ν° μ²λ¦¬
        builder.addCase(logout.fulfilled, (state, { payload }) => {
            const { success } = payload;
            success ? console.log("π Logout Success") : console.log("β οΈ Logout Failure");
        });
    },
});

// π·οΈ λ‘κ·ΈμΈνκ³  μ μ  μν λ°μμ€κΈ°
export const signInAndAuth = (inputData) => async (dispatch) => {
    await dispatch(signIn(inputData));
    const {
        payload: { isAuth },
    } = await dispatch(fetchAuth());
    return isAuth;
};
// π·οΈ λ‘κ·Έμμνκ³  μ μ  μν λ°μμ€κΈ°
export const logoutAndAuth = () => async (dispatch) => {
    await dispatch(logout());
    const {
        payload: { isAuth },
    } = await dispatch(fetchAuth());
    return isAuth;
};

export default UserSlice.reducer;
