import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Login() {
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            return toast.error("Please fill all fields");
        }

        dispatch(loginUser(form));
    };

    useEffect(() => {
        if (user) {
            toast.success(`Welcome ${user.name || "User"} 👋`);

            if (user.role === "admin") navigate("/admin");
            else navigate("/");
        }

        if (error) {
            toast.error(error?.message || "Login failed");
        }
    }, [user, error, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative">

            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-md mx-4 bg-black/70 backdrop-blur-xl border border-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl"
            >
                <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-6">
                    Welcome Back 👋
                </h2>


                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    className="w-full mb-4 p-3 rounded bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />


                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={form.password}
                        className="w-full mb-4 p-3 rounded bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-4 cursor-pointer text-gray-400"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>


                <button
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded font-semibold"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>


                <p className="text-gray-400 text-sm mt-5 text-center">
                    New user?{" "}
                    <Link to="/register" className="text-red-500 hover:underline">
                        Create account
                    </Link>
                </p>
            </form>
        </div>
    );
}