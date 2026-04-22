import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Api/api";



export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/register", data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const logoutUser = createAsyncThunk("auth/logout", async () => {
    await api.post("/auth/logout");
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });

    },
});

export default authSlice.reducer;