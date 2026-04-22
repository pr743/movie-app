import { useEffect, useState } from "react";
import api from "../Api/api";
import Navbar from "../components/Navbar";
import { FaTrash, FaUserShield, FaUser } from "react-icons/fa";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/admin/users");
            setUsers(res.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Delete this user?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/admin/users/${id}`);
            fetchUsers();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            <div className="px-4 md:px-10 py-6">


                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        👥 User Management
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Manage all registered users
                    </p>
                </div>


                {loading && (
                    <p className="text-gray-400">Loading users...</p>
                )}

                <div className="grid gap-4">

                    {users.map((u) => (
                        <div
                            key={u._id}
                            className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:scale-[1.01] transition"
                        >


                            <div className="flex items-center gap-3">

                                <div className="bg-gray-800 p-3 rounded-full">
                                    {u.role === "admin" ? (
                                        <FaUserShield className="text-yellow-400" />
                                    ) : (
                                        <FaUser className="text-gray-300" />
                                    )}
                                </div>

                                <div>
                                    <p className="font-semibold">{u.name}</p>
                                    <p className="text-gray-400 text-sm">
                                        {u.email}
                                    </p>
                                </div>

                            </div>


                            <div className="flex items-center gap-3">


                                <span
                                    className={`text-xs px-3 py-1 rounded-full 
                                    ${u.role === "admin"
                                            ? "bg-yellow-500/20 text-yellow-400"
                                            : "bg-green-500/20 text-green-400"
                                        }`}
                                >
                                    {u.role}
                                </span>


                                <span className="text-xs text-gray-400">
                                    🎬 {u.watchlist?.length || 0}
                                </span>


                                <button
                                    onClick={() => deleteUser(u._id)}
                                    className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm flex items-center gap-1"
                                >
                                    <FaTrash /> Delete
                                </button>

                            </div>
                        </div>
                    ))}

                </div>


                {!loading && users.length === 0 && (
                    <p className="text-gray-500 text-center mt-10">
                        No users found 😢
                    </p>
                )}

            </div>
        </div>
    );
}