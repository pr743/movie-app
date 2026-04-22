import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../features/movie/movieSlice";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function AdminAddMovie() {
    const dispatch = useDispatch();

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
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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
                data.append(key, form[key]);
            });

            await dispatch(addMovie(data)).unwrap();

            toast.success("🎬 Movie added successfully!");

            setForm({
                title: "",
                description: "",
                genre: "",
                trailerUrl: "",
                duration: "",
                releaseDate: "",
                rating: "",
                tagline: "",
                poster: null,
            });

            setPreview(null);

        } catch {
            toast.error("❌ Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-6">

                <h1 className="text-2xl md:text-4xl font-bold mb-6">
                    🎬 Add New Movie
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-900 p-5 md:p-8 rounded-xl border border-gray-800 space-y-4"
                >

                    <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="input" />
                    <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" required className="input" />

                    <div className="grid grid-cols-2 gap-3">
                        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="input" />
                        <input name="releaseDate" value={form.releaseDate} onChange={handleChange} placeholder="Year" className="input" />
                    </div>

                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        placeholder="Rating (0-10)"
                        className="input"
                    />
                    <input name="tagline" value={form.tagline} onChange={handleChange} placeholder="Tagline" className="input" />

                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input h-24" />

                    <input name="trailerUrl" value={form.trailerUrl} onChange={handleChange} placeholder="Trailer URL" className="input" />


                    <div>
                        <label className="block text-gray-400 mb-2">Poster</label>

                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:border-red-500 transition">
                            <input type="file" accept="image/*" onChange={handleImage} className="hidden" id="upload" />
                            <label htmlFor="upload" className="cursor-pointer">
                                Upload Image 📸
                            </label>
                        </div>

                        {preview && (
                            <img src={preview} className="mt-4 rounded-lg w-full h-60 object-cover" />
                        )}
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-red-600 py-3 rounded-lg font-bold hover:bg-red-700 transition"
                    >
                        {loading ? "Uploading..." : "Add Movie 🚀"}
                    </button>
                </form>
            </div>

            <style>{`
                .input {
                    width: 100%;
                    padding: 12px;
                    background: #111827;
                    border-radius: 8px;
                    outline: none;
                }
                .input:focus {
                    box-shadow: 0 0 0 2px #ef4444;
                }
            `}</style>
        </div>
    );
}