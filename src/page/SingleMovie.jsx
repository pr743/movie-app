import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchlist } from "../features/movie/movieSlice";
import {
    AiFillLike,
    AiOutlineLike,
    AiFillDislike,
    AiOutlineDislike,
} from "react-icons/ai";
import Footer from "../components/Footer";

export default function SingleMovie() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [movie, setMovie] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);

    const { watchlist = [] } = useSelector((state) => state.movies);
    const { user } = useSelector((state) => state.auth || {});

    const [userRating, setUserRating] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const fetchMovie = async () => {
        const res = await api.get(`/movies/${id}`);
        const m = res.data.data;

        setMovie(m);

        const myRating = m.ratings?.find(
            (r) => r.user === user?._id
        );
        setUserRating(myRating?.value || 0);

        setLiked(m.likes?.includes(user?._id));
        setDisliked(m.dislikes?.includes(user?._id));
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchMovie();
    }, [id, user]);


    const getEmbedUrl = (url) => {
        if (!url) return "";

        let videoId = "";

        if (url.includes("youtu.be")) {
            videoId = url.split("/").pop().split("?")[0];
        } else {
            videoId = new URL(url).searchParams.get("v");
        }

        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0`;
    };

    const handleRate = async (value) => {
        await api.post(`/movies/rate/${movie._id}`, { value });
        setUserRating(value);
        fetchMovie();
    };

    const isAdded = watchlist?.includes(String(movie?._id));

    const avgRating =
        movie?.ratings?.reduce((acc, r) => acc + r.value, 0) /
        (movie?.ratings?.length || 1);

    if (!movie) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <p className="text-xl animate-pulse">🎬 Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen">

            <Navbar />


            <div className="block md:hidden">

                <div className="w-full h-[220px]">
                    <iframe
                        className="w-full h-full"
                        src={getEmbedUrl(movie.trailerUrl)}
                        allow="autoplay; fullscreen"
                        title="mobile-trailer"
                    />
                </div>


                <div className="px-4 py-5 space-y-3">

                    <h1 className="text-xl font-bold">
                        {movie.title}
                    </h1>

                    <p className="text-gray-400 text-xs">
                        ⭐ {avgRating?.toFixed(1)} • {movie.releaseDate} • {movie.duration}
                    </p>

                    <p className="text-gray-300 text-sm">
                        {movie.description}
                    </p>

                    <div className="flex gap-2 flex-wrap">

                        <button
                            onClick={() => setShowTrailer(true)}
                            className="bg-red-600 px-4 py-2 rounded text-sm"
                        >
                            ▶ Play
                        </button>

                        <button
                            onClick={() => dispatch(toggleWatchlist(movie._id))}
                            className={`px-4 py-2 rounded text-sm ${isAdded ? "bg-green-600" : "bg-gray-800"
                                }`}
                        >
                            {isAdded ? "❤️ Added" : "🤍 Watchlist"}
                        </button>
                    </div>


                    <div className="flex gap-3">

                        <button
                            onClick={async () => {
                                setLiked(!liked);
                                setDisliked(false);
                                await api.post(`/movies/like/${movie._id}`);
                            }}
                            className={`px-3 py-1 rounded ${liked ? "bg-green-600" : "bg-gray-800"
                                }`}
                        >
                            {liked ? <AiFillLike /> : <AiOutlineLike />}
                            {movie.likes?.length || 0}
                        </button>

                        <button
                            onClick={async () => {
                                setDisliked(!disliked);
                                setLiked(false);
                                await api.post(`/movies/dislike/${movie._id}`);
                            }}
                            className={`px-3 py-1 rounded ${disliked ? "bg-red-600" : "bg-gray-800"
                                }`}
                        >
                            {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
                            {movie.dislikes?.length || 0}
                        </button>
                    </div>


                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRate(star)}
                                className={`text-lg ${star <= userRating
                                    ? "text-yellow-400"
                                    : "text-gray-500"
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                </div>
            </div>



            <div className="hidden md:block relative w-full h-[80vh] overflow-hidden">

                <iframe
                    className="absolute inset-0 w-full h-full scale-125 pointer-events-none"
                    src={getEmbedUrl(movie.trailerUrl)}
                    allow="autoplay; fullscreen"
                    title="background-trailer"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 flex flex-col justify-end h-full px-10 pb-10 max-w-xl">

                    <h1 className="text-6xl font-bold mb-3">
                        {movie.title}
                    </h1>

                    <p className="text-gray-300 mb-3">
                        ⭐ {avgRating?.toFixed(1)} • {movie.releaseDate} • {movie.duration}
                    </p>

                    <p className="text-gray-300 mb-5">
                        {movie.description}
                    </p>


                    <div className="flex gap-3 flex-wrap">

                        <button
                            onClick={() => setShowTrailer(true)}
                            className="bg-red-600 px-6 py-2 rounded hover:scale-105 transition"
                        >
                            ▶ Play
                        </button>

                        <button
                            onClick={() => dispatch(toggleWatchlist(movie._id))}
                            className={`px-6 py-2 rounded font-bold ${isAdded ? "bg-green-600" : "bg-gray-800"
                                }`}
                        >
                            {isAdded ? "❤️ Added" : "🤍 Watchlist"}
                        </button>

                    </div>


                    <div className="flex gap-4 mt-4">

                        <button
                            onClick={async () => {
                                setLiked(!liked);
                                setDisliked(false);

                                setMovie((prev) => ({
                                    ...prev,
                                    likes: liked
                                        ? prev.likes.filter((id) => id !== user._id)
                                        : [...prev.likes, user._id],
                                    dislikes: prev.dislikes.filter((id) => id !== user._id),
                                }));

                                await api.post(`/movies/like/${movie._id}`);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full ${liked ? "bg-green-600" : "bg-gray-800"
                                }`}
                        >
                            {liked ? <AiFillLike /> : <AiOutlineLike />}
                            {movie.likes?.length || 0}
                        </button>

                        <button
                            onClick={async () => {
                                setDisliked(!disliked);
                                setLiked(false);

                                setMovie((prev) => ({
                                    ...prev,
                                    dislikes: disliked
                                        ? prev.dislikes.filter((id) => id !== user._id)
                                        : [...prev.dislikes, user._id],
                                    likes: prev.likes.filter((id) => id !== user._id),
                                }));

                                await api.post(`/movies/dislike/${movie._id}`);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full ${disliked ? "bg-red-600" : "bg-gray-800"
                                }`}
                        >
                            {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
                            {movie.dislikes?.length || 0}
                        </button>

                    </div>


                    <div className="flex gap-1 mt-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRate(star)}
                                className={`text-2xl ${star <= userRating
                                    ? "text-yellow-400"
                                    : "text-gray-500"
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                </div>
            </div>


            {showTrailer && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4">
                    <div className="w-full max-w-4xl">
                        <iframe
                            className="w-full h-[250px] md:h-[500px]"
                            src={getEmbedUrl(movie.trailerUrl)}
                            title="Trailer"
                            allowFullScreen
                        />
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="mt-4 bg-red-600 px-4 py-2 rounded w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}















