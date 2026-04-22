import { useEffect, useState } from "react";
import api from "../Api/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AdminMovies() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const fetchMovies = async () => {
        try {
            const res = await api.get("/movies");
            setMovies(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this movie?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/movies/${id}`);
            fetchMovies();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchMovies();
    }, []);

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            <div className="px-4 md:px-10 py-6">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl md:text-3xl font-bold">
                        🎬 Manage Movies
                    </h1>

                    <button
                        onClick={() => navigate("/admin/add-movie")}
                        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition text-sm md:text-base"
                    >
                        ➕ Add Movie
                    </button>
                </div>

                {/* MOVIES GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">

                    {movies.map((m) => (
                        <div
                            key={m._id}
                            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
                        >

                            {/* POSTER */}
                            <img
                                src={m.posterUrl}
                                alt={m.title}
                                className="h-44 md:h-60 w-full object-cover"
                            />

                            {/* CONTENT */}
                            <div className="p-3">

                                <h2 className="text-sm md:text-base font-semibold line-clamp-1">
                                    {m.title}
                                </h2>

                                <p className="text-gray-400 text-xs mt-1">
                                    {m.genre}
                                </p>

                                {/* ACTIONS */}
                                <div className="flex gap-2 mt-3">

                                    <button
                                        onClick={() => navigate(`/admin/edit-movie/${m._id}`)}
                                        className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs md:text-sm"
                                    >
                                        <FaEdit /> Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(m._id)}
                                        className="flex-1 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs md:text-sm"
                                    >
                                        <FaTrash /> Delete
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>

                {/* EMPTY STATE */}
                {movies.length === 0 && (
                    <p className="text-gray-400 text-center mt-10">
                        No movies found 😢
                    </p>
                )}

            </div>
        </div>
    );
}