import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Api/api";



export const toggleWatchlist = createAsyncThunk(
    "movie/toggleWatchlist",
    async (movieId) => {
        const res = await api.post(`/movies/watchlist/${movieId}`);
        return res.data.watchlist;
    }
);

export const fetchMovies = createAsyncThunk(
    "movies/get",
    async () => {
        const res = await api.get("/movies");
        return res.data.data;
    }
);


export const addMovie = createAsyncThunk(
    "movies/add",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post("/movies", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const deleteMovie = createAsyncThunk(
    "movies/delete",
    async (id) => {
        await api.delete(`/movies/${id}`);
        return id;
    }
);


export const updateMovie = createAsyncThunk(
    "movies/update",
    async ({ id, formData }) => {
        const res = await api.put(`/movies/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data.data;
    }
);

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        watchlist: [],
        loading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.movies = action.payload;
            })
            .addCase(addMovie.fulfilled, (state, action) => {
                state.movies.unshift(action.payload);
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.movies = state.movies.filter(
                    (m) => m._id !== action.payload
                );
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                const index = state.movies.findIndex(
                    (m) => m._id === action.payload._id
                );
                state.movies[index] = action.payload;
            })
            // .addCase(toggleWatchlist.fulfilled, (state, action) => {
            //     state.watchlist = action.payload || [];
            // }) 

            .addCase(toggleWatchlist.fulfilled, (state, action) => {
                state.watchlist = Array.isArray(action.payload)
                    ? action.payload.map((id) => id.toString())
                    : [];
            });
    },
});

export default movieSlice.reducer;