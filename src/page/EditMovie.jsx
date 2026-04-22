import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateMovie } from "../features/movie/movieSlice";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Api/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function EditMovie() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        genre: "",
        trailerUrl: "",
        duration: "",
        releaseDate: "",
        rating: "",
        tagline: "",
        poster: null,
        oldPoster: "",
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await api.get(`/movies/${id}`);
            const m = res.data.data;

            setForm({
                title: m.title || "",
                description: m.description || "",
                genre: m.genre || "",
                trailerUrl: m.trailerUrl || "",
                duration: m.duration || "",
                releaseDate: m.releaseDate || "",
                rating: m.rating || "",
                tagline: m.tagline || "",
                poster: null,
                oldPoster: m.posterUrl,
            });

            setPreview(m.posterUrl);
        };

        fetchMovie();
    }, [id]);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setForm({ ...form, poster: file });

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();

            Object.keys(form).forEach((key) => {
                if (form[key] && key !== "oldPoster") {
                    data.append(key, form[key]);
                }
            });

            await dispatch(updateMovie({ id, formData: data }));

            toast.success("🎬 Movie updated successfully!");

            navigate("/admin");
        } catch {
            toast.error("❌ Update failed");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-6">

                <h1 className="text-2xl md:text-4xl font-bold mb-6">
                    ✏️ Edit Movie
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-900 p-5 md:p-8 rounded-xl border border-gray-800 space-y-4"
                >


                    <input
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        placeholder="Title"
                        className="input"
                    />

                    <input
                        value={form.genre}
                        onChange={(e) =>
                            setForm({ ...form, genre: e.target.value })
                        }
                        placeholder="Genre"
                        className="input"
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            value={form.duration}
                            onChange={(e) =>
                                setForm({ ...form, duration: e.target.value })
                            }
                            placeholder="Duration"
                            className="input"
                        />

                        <input
                            value={form.releaseDate}
                            onChange={(e) =>
                                setForm({ ...form, releaseDate: e.target.value })
                            }
                            placeholder="Release Year"
                            className="input"
                        />
                    </div>

                    <input
                        value={form.rating}
                        onChange={(e) =>
                            setForm({ ...form, rating: e.target.value })
                        }
                        placeholder="Rating"
                        className="input"
                    />

                    <input
                        value={form.tagline}
                        onChange={(e) =>
                            setForm({ ...form, tagline: e.target.value })
                        }
                        placeholder="Tagline"
                        className="input"
                    />

                    <textarea
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        placeholder="Description"
                        className="input h-24"
                    />

                    <input
                        value={form.trailerUrl}
                        onChange={(e) =>
                            setForm({ ...form, trailerUrl: e.target.value })
                        }
                        placeholder="Trailer URL"
                        className="input"
                    />


                    <div>
                        <p className="text-gray-400 mb-2">Poster</p>

                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-blue-500 transition">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                className="hidden"
                                id="upload"
                            />
                            <label htmlFor="upload" className="cursor-pointer">
                                Change Poster 📸
                            </label>
                        </div>

                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="mt-4 w-full h-60 object-cover rounded-lg"
                            />
                        )}
                    </div>


                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                    >
                        {loading ? "Updating..." : "Update Movie 🚀"}
                    </button>
                </form>
            </div>

            <style>
                {`
                .input {
                    width: 100%;
                    padding: 12px;
                    border-radius: 8px;
                    background: #111827;
                    outline: none;
                }
                .input:focus {
                    box-shadow: 0 0 0 2px #3b82f6;
                }
                `}
            </style>
        </div>
    );
}