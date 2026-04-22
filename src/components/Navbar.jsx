import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    Menu,
    X,
    Search,
    User,
    Heart,
    LogOut,
    ShieldCheck,
    Home
} from "lucide-react";

export default function Navbar({ onSearch }) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
    };

    return (
        <>

            <nav className="sticky top-0 z-50 flex justify-between items-center px-4 md:px-8 py-4 bg-black/70 backdrop-blur-xl border-b border-white/10 text-white">


                <Link to="/" className="text-xl md:text-2xl font-bold text-red-500 tracking-wide">
                    🎬 MovieApp
                </Link>


                <div className="hidden md:flex items-center bg-gray-800 rounded-full px-3 py-2 w-72 focus-within:ring-2 focus-within:ring-red-500 transition">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={search}
                        onChange={handleSearch}
                        className="bg-transparent outline-none ml-2 w-full text-sm"
                    />
                </div>


                <div className="hidden md:flex gap-6 items-center">

                    <Link to="/" className="flex items-center gap-1 hover:text-red-400">
                        <Home size={18} /> Home
                    </Link>

                    {user?.role === "admin" && (
                        <Link to="/admin" className="flex items-center gap-1 text-yellow-400">
                            <ShieldCheck size={18} /> Admin
                        </Link>
                    )}

                    {user && (
                        <>


                            <Link
                                to="/watchlist"
                                className="flex items-center gap-1 bg-pink-600 px-3 py-1 rounded-full hover:scale-105 transition"
                            >
                                <Heart size={16} /> Watchlist
                            </Link>

                            <Link
                                to="/profile"
                                className="flex items-center gap-1 hover:text-blue-400"
                            >
                                <User size={18} /> Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 bg-red-600 px-3 py-1 rounded-full hover:scale-105 transition"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    )}
                </div>


                <button
                    onClick={() => setMenuOpen(true)}
                    className="md:hidden"
                >
                    <Menu size={28} />
                </button>
            </nav>


            <div className={`fixed inset-0 z-50 ${menuOpen ? "visible" : "invisible"}`}>


                <div
                    onClick={() => setMenuOpen(false)}
                    className={`absolute inset-0 bg-black/70 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
                />


                <div className={`absolute right-0 top-0 h-full w-72 bg-black p-6 transform transition-transform duration-300 
                ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>


                    <button
                        onClick={() => setMenuOpen(false)}
                        className="mb-6"
                    >
                        <X size={28} />
                    </button>


                    <div className="flex items-center bg-gray-800 rounded-full px-3 py-2 mb-6">
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={handleSearch}
                            className="bg-transparent outline-none ml-2 w-full text-sm"
                        />
                    </div>


                    <div className="flex flex-col gap-5 text-lg">

                        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                            <Home /> Home
                        </Link>

                        {user?.role === "admin" && (
                            <Link
                                to="/admin"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2 text-yellow-400"
                            >
                                <ShieldCheck /> Admin
                            </Link>
                        )}

                        {user && (
                            <>
                                <p className="text-gray-400">{user.name}</p>

                                <Link
                                    to="/watchlist"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2"
                                >
                                    <Heart /> Watchlist
                                </Link>

                                <Link
                                    to="/profile"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2"
                                >
                                    <User /> Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-600 px-3 py-2 rounded mt-4"
                                >
                                    <LogOut /> Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

















