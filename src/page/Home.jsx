import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movie/movieSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Row from "./Row";
import Footer from "../components/Footer";
import { FaPlay } from "react-icons/fa";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { movies = [] } = useSelector((state) => state.movies || {});
    const { user } = useSelector((state) => state.auth || {});

    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    useEffect(() => {
        if (movies.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === movies.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [movies]);

    const currentMovie = movies[currentIndex];

    const trending = movies.slice(0, 10);
    const actionMovies = movies.filter((m) =>
        m.genre?.toLowerCase().includes("action")
    );
    const dramaMovies = movies.filter((m) =>
        m.genre?.toLowerCase().includes("drama")
    );
    const latest = [...movies].reverse();

    const filterMovies = movies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-black text-white min-h-screen">

            <Navbar onSearch={setSearchQuery} />


            {!searchQuery && currentMovie && (
                <div className="relative w-full h-[60vh] md:h-[85vh]">

                    <img
                        src={currentMovie.posterUrl}
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        alt={currentMovie.title}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                    <div className="relative z-10 px-4 md:px-10 pb-10 flex flex-col justify-end h-full">

                        <h1 className="text-2xl md:text-6xl font-bold mb-3">
                            {currentMovie.title}
                        </h1>

                        <p className="max-w-xl text-gray-300 text-sm md:text-lg mb-5 line-clamp-3">
                            {currentMovie.description}
                        </p>

                        <div className="flex gap-3 flex-wrap">

                            <button
                                onClick={() =>
                                    navigate(`/movie/${currentMovie._id}`)
                                }
                                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:scale-105 transition"
                            >
                                <FaPlay /> Play
                            </button>


                            {user?.role === "admin" && (
                                <button
                                    onClick={() => navigate("/admin")}
                                    className="bg-yellow-500 text-black px-5 py-2 rounded hover:scale-105 transition"
                                >
                                    Go to Admin Panel
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}


            {searchQuery ? (
                <div className="px-4 md:px-10 py-6">

                    <h2 className="text-xl md:text-2xl mb-5">
                        Results for "{searchQuery}"
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

                        {filterMovies.map((m) => (
                            <div
                                key={m._id}
                                onClick={() => navigate(`/movie/${m._id}`)}
                                className="cursor-pointer hover:scale-105 transition"
                            >
                                <img
                                    src={m.posterUrl}
                                    className="h-40 md:h-64 w-full object-cover rounded-lg"
                                />
                                <p className="mt-2 text-sm">{m.title}</p>
                            </div>
                        ))}
                    </div>

                    {filterMovies.length === 0 && (
                        <p className="text-gray-400 mt-10">
                            No results found 😢
                        </p>
                    )}
                </div>
            ) : (
                <>
                    <Row title="🔥 Trending" movies={trending} />
                    <Row title="⚡ Action" movies={actionMovies} />
                    <Row title="🎭 Drama" movies={dramaMovies} />
                    <Row title="🆕 Latest" movies={latest} />
                </>
            )}

            <Footer />
        </div>
    );
}