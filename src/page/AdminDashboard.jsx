import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    Film,
    Users,
    PlusCircle,
    LayoutDashboard
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../Api/api";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalMovies: 0,
        totalUsers: 0,
        totalWatchlist: 0,
    });

    const fetchStats = async () => {
        try {
            const res = await api.get("/admin/stats");
            setStats(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchStats();
    }, []);

    return (
        <div className="bg-black text-white min-h-screen">

            <Navbar />

            <div className="flex">


                <div className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 p-6 space-y-6">

                    <h2 className="text-xl font-bold text-yellow-400">
                        Admin Panel
                    </h2>

                    <button className="flex items-center gap-2 hover:text-red-400">
                        <LayoutDashboard size={18} /> Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/admin/add-movie")}
                        className="flex items-center gap-2 hover:text-red-400"
                    >
                        <PlusCircle size={18} /> Add Movie
                    </button>

                    <button onClick={() => navigate("/admin/movies")} className="flex items-center gap-2 hover:text-red-400">
                        <Film size={18} /> Manage Movies
                    </button>

                    <button onClick={() => navigate("/admin/users")} className="flex items-center gap-2 hover:text-red-400">
                        <Users size={18} /> Users
                    </button>

                </div>
                <div className="flex-1 p-6 md:p-10">

                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">
                            ⚙️ Dashboard Overview
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Real-time platform data
                        </p>
                    </div>



                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:scale-105 transition">
                            <h3 className="text-gray-400 text-sm">Total Movies</h3>
                            <p className="text-3xl font-bold mt-2">
                                {stats.totalMovies}
                            </p>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:scale-105 transition">
                            <h3 className="text-gray-400 text-sm">Total Users</h3>
                            <p className="text-3xl font-bold mt-2">
                                {stats.totalUsers}
                            </p>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:scale-105 transition">
                            <h3 className="text-gray-400 text-sm">Watchlist Items</h3>
                            <p className="text-3xl font-bold mt-2">
                                {stats.totalWatchlist}
                            </p>
                        </div>

                    </div>



                    <div className="mt-10">

                        <h2 className="text-xl font-semibold mb-4">
                            Quick Actions
                        </h2>

                        <div className="flex flex-wrap gap-4">

                            <button
                                onClick={() => navigate("/admin/add-movie")}
                                className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg flex items-center gap-2"
                            >
                                <PlusCircle size={18} />
                                Add Movie
                            </button>

                            <button onClick={() => navigate("/admin/movies")} className="bg-gray-800 px-5 py-3 rounded-lg flex items-center gap-2">
                                <Film size={18} />
                                Manage Movies
                            </button>

                            <button onClick={() => navigate("/admin/users")} className="bg-gray-800 px-5 py-3 rounded-lg flex items-center gap-2">
                                <Users size={18} />
                                Users
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}