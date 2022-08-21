import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import loginUserReducer from "./slices/loginUserReducer";

const store = configureStore({
    reducer: {
        loginUser: loginUserReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }),
        logger,
        ReduxThunk,
    ],
});

export default store;
