import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthAPI } from "./AuthAPI";
import { AuthReducer } from "./AuthSlice";

export const Reducer = configureStore({
    reducer: {
        auth: AuthReducer,
        [AuthAPI.reducerPath]: AuthAPI.reducer,
    },      // gDM = getDefaultMiddleware
    middleware: (gDM) => gDM().concat(AuthAPI.middleware)
});

setupListeners(Reducer.dispatch);



