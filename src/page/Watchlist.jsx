import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Watchlist() {
    const navigate = useNavigate();

    const { watchlist = [], movies = [] } = useSelector(
        (state) => state.movies
    );

    const safeWatchlist = Array.isArray(watchlist) ? watchlist : [];

    const watchlistMovies = movies.filter((m) =>
        safeWatchlist.includes(String(m._id))
    );

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            <div className="px-4 md:px-10 py-6 md:py-10">


                <h1 className="text-xl md:text-3xl font-bold mb-6">
                    ❤️ My Watchlist
                </h1>


                {watchlistMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">

                        {watchlistMovies.map((m) => (
                            <div
                                key={m._id}
                                onClick={() => navigate(`/movie/${m._id}`)}
                                className="cursor-pointer group"
                            >

                                <div className="relative overflow-hidden rounded-lg shadow-lg">


                                    <img
                                        src={m.posterUrl}
                                        alt={m.title}
                                        className="h-52 sm:h-60 md:h-64 w-full object-cover transform group-hover:scale-110 transition duration-300"
                                    />


                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

                                        <span className="text-sm bg-red-600 px-3 py-1 rounded">
                                            ▶ Play
                                        </span>

                                    </div>
                                </div>


                                <p className="mt-2 text-xs sm:text-sm md:text-base truncate">
                                    {m.title}
                                </p>
                            </div>
                        ))}

                    </div>
                ) : (

                    <div className="flex flex-col items-center justify-center mt-20 text-center">

                        <p className="text-gray-400 text-sm md:text-lg">
                            No movies in watchlist 😢
                        </p>

                        <button
                            onClick={() => navigate("/")}
                            className="mt-4 bg-red-600 px-5 py-2 rounded hover:scale-105 transition"
                        >
                            Browse Movies
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}