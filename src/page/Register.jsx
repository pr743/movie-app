/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
    const dispatch = useDispatch();

    const [showAdmin, setShowAdmin] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        adminSecret: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const payload = {
            name: form.name,
            email: form.email,
            password: form.password,
        };

        if (showAdmin && form.adminSecret) {
            payload.adminSecret = form.adminSecret;
        }

        try {
            const res = await dispatch(registerUser(payload)).unwrap();
            toast.success("✅ Account created successfully!");

            setForm({
                name: "",
                email: "",
                password: "",
                adminSecret: "",
            });

            setShowAdmin(false);

        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md bg-black/70 backdrop-blur-md p-8 rounded-2xl border border-gray-800 shadow-2xl">

                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded focus:ring-2 focus:ring-red-500 outline-none"
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded focus:ring-2 focus:ring-red-500 outline-none"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded focus:ring-2 focus:ring-red-500 outline-none"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />


                    {showAdmin && (
                        <input
                            type="password"
                            placeholder="Enter Admin Secret"
                            value={form.adminSecret}
                            className="w-full p-3 bg-gray-800 text-red-400 border border-red-500 rounded focus:ring-2 focus:ring-red-500 outline-none"
                            onChange={(e) =>
                                setForm({ ...form, adminSecret: e.target.value })
                            }
                        />
                    )}

                    <button className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded text-white font-semibold">
                        Register
                    </button>
                </form>


                <p
                    onClick={() => setShowAdmin(!showAdmin)}
                    className="text-gray-400 text-sm text-center mt-4 cursor-pointer hover:text-white"
                >
                    {showAdmin ? "Register as normal user" : "Are you admin? Click here"}
                </p>


                <p className="text-gray-400 text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-white hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}























