import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tasksReducer from "./slices/tasksSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer
    }
});

// ✅ TypeScript types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;