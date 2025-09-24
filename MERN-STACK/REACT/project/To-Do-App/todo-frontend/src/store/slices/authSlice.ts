import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";

interface User {
    id: string;
    email: string;
}

interface AuthState {
    user: User | null;
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

// 🔹 Register thunk
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (
        {userName, email, password}: { userName: string; email: string; password: string; },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post('/api/auth/register', { 
                userName, 
                email, 
                password 
            });
            return response.data; // { user, token }
         } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
    }
);

// 🔹 Login thunk
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({email, password}: { email: string; password: string; },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post('/api/auth/login', { 
                email, 
                password 
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

// store/slices/authSlice.ts
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/refresh-token"); // backend uses cookie
      return response.data; // { accessToken }
    } catch (err: any) {
      return rejectWithValue("Not authenticated");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/api/auth/logout", {}, { withCredentials: true });
      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Register cases
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload as string || "Register failed";
        });

        // Login cases
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || "Login failed";
        });

        // checkAuth cases
        builder
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.token = action.payload.accessToken;
        })
        .addCase(checkAuth.rejected, (state) => {
            state.user = null;
            state.token = null;
        });

        // logout case
        builder
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.token = null;
        })
    }
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;