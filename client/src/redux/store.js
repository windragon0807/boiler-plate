import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import LoginSlice from "./slices/loginReducer";
import RegisterSlice from "./slices/registerReducer";

const store = configureStore({
    reducer: {
        login: LoginSlice,
        register: RegisterSlice,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }),
        logger,
        ReduxThunk,
    ],
});

export default store;
