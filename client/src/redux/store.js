import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import LoginUserReducer from "./slices/loginUserReducer";

const store = configureStore({
    reducer: {
        login: LoginUserReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }),
        logger,
        ReduxThunk,
    ],
});

export default store;
