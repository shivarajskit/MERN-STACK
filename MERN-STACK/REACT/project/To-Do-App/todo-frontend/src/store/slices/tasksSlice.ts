import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null
}

const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        const response = await api.get('/tasks');
        return response.data.tasks;
    }
)

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch tasks";
        })
    }
});

export default tasksSlice.reducer;
