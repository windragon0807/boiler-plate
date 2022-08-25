import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import sessionStorage from "redux-persist/lib/storage/session";
import UserSlice from "./slices/userReducer";

const config = {
    key: "root",
    version: 1,
    storage: sessionStorage,
};

const rootReducer = combineReducers({
    user: UserSlice,
});

const persistedReducer = persistReducer(config, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
        logger,
        ReduxThunk,
    ],
});

export const persistor = persistStore(store);

export default store;
