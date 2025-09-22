import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { useNavigate } from "react-router-dom";

interface AuthState {
    user: string | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({email, password}: { email: string; password: string; }) => {
        const response = await api.post('/api/auth/login', { email, password });
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Login failed";
        })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;