import { configureStore } from "@reduxjs/toolkit";
import loginIn from './signInSlice';

const store = configureStore({
    reducer: {
        loginIn: loginIn.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
