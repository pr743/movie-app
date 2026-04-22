import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { FaPlay } from "react-icons/fa";

export default function Movies() {
    const { movies = [] } = useSelector((state) => state.movies);
    const navigate = useNavigate();

    const query = new URLSearchParams(useLocation().search);
    const category = query.get("category");

    let filtered = movies;

    if (category?.includes("Trending")) {
        filtered = movies.slice(0, 10);
    } else if (category?.includes("Action")) {
        filtered = movies.filter((m) =>
            m.genre?.toLowerCase().includes("action")
        );
    } else if (category?.includes("Drama")) {
        filtered = movies.filter((m) =>
            m.genre?.toLowerCase().includes("drama")
        );
    } else if (category?.includes("Latest")) {
        filtered = [...movies].reverse();
    }

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            <div className="px-4 md:px-10 py-6 md:py-10">


                <h1 className="text-xl md:text-3xl font-bold mb-6">
                    {category || "Movies"}
                </h1>


                {filtered.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">

                        {filtered.map((m) => (
                            <div
                                key={m._id}
                                onClick={() => navigate(`/movie/${m._id}`)}
                                className="cursor-pointer group"
                            >


                                <div className="relative overflow-hidden rounded-lg shadow-lg">

                                    <img
                                        src={m.posterUrl}
                                        alt={m.title}
                                        className="h-48 sm:h-56 md:h-64 w-full object-cover 
                                        transform group-hover:scale-110 transition duration-300"
                                    />


                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

                                        <div className="bg-white text-black p-2 md:px-4 md:py-2 rounded-full shadow-lg">
                                            <FaPlay />
                                        </div>

                                    </div>
                                </div>

                                {/* TITLE */}
                                <p className="mt-2 text-xs sm:text-sm md:text-base truncate">
                                    {m.title}
                                </p>
                            </div>
                        ))}

                    </div>
                ) : (

                    <div className="flex flex-col items-center justify-center mt-20 text-center">
                        <p className="text-gray-400">
                            No movies found 😢
                        </p>

                        <button
                            onClick={() => navigate("/")}
                            className="mt-4 bg-red-600 px-5 py-2 rounded hover:scale-105 transition"
                        >
                            Go Home
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}