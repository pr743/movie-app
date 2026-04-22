import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

export default function Profile() {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            <div className="px-4 md:px-10 py-8 flex justify-center">

                <div className="w-full max-w-2xl">


                    <div className="flex flex-col items-center text-center mb-8">


                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-800 flex items-center justify-center text-3xl md:text-5xl font-bold mb-4 shadow-lg">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <h1 className="text-2xl md:text-4xl font-bold">
                            {user?.name}
                        </h1>

                        <p className="text-gray-400 text-sm md:text-base">
                            {user?.email}
                        </p>

                    </div>


                    <div className="bg-gray-900/80 backdrop-blur-md p-5 md:p-8 rounded-xl shadow-xl space-y-5">


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Role</p>
                                <p className="font-semibold capitalize">
                                    {user?.role}
                                </p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-400">Watchlist</p>
                                <p className="font-semibold">
                                    {user?.watchlist?.length || 0} Movies
                                </p>
                            </div>

                        </div>


                        <div className="text-center mt-4">
                            {user?.role === "admin" ? (
                                <p className="text-yellow-400 text-sm md:text-base">
                                    🔧 Admin Access Enabled
                                </p>
                            ) : (
                                <p className="text-green-400 text-sm md:text-base">
                                    🎬 Regular User
                                </p>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}