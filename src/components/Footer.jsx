import { Link } from "react-router-dom";
import {
    FaInstagram,
    FaYoutube,
    FaGithub,
    FaHeart,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 border-t border-gray-800 mt-16">


            <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">


                <div>
                    <h2 className="text-white text-xl md:text-2xl font-bold mb-3">
                        🎬 MovieApp
                    </h2>

                    <p className="text-sm text-gray-400 leading-relaxed">
                        Stream, explore and rate movies with a Netflix-like experience.
                    </p>


                    <div className="flex justify-center md:justify-start gap-4 mt-4 text-lg">
                        <FaInstagram className="hover:text-white cursor-pointer transition" />
                        <FaYoutube className="hover:text-white cursor-pointer transition" />
                        <FaGithub className="hover:text-white cursor-pointer transition" />
                    </div>
                </div>


                <div>
                    <h3 className="text-white font-semibold mb-3">Browse</h3>

                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="hover:text-white transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies?category=Trending" className="hover:text-white transition">
                                Trending
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies?category=Latest" className="hover:text-white transition">
                                Latest
                            </Link>
                        </li>
                    </ul>
                </div>


                <div>
                    <h3 className="text-white font-semibold mb-3">More</h3>

                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer transition">
                            About Us
                        </li>
                        <li className="hover:text-white cursor-pointer transition">
                            Privacy Policy
                        </li>
                        <li className="hover:text-white cursor-pointer transition">
                            Terms of Service
                        </li>
                    </ul>
                </div>
            </div>


            <div className="border-t border-gray-800 mx-4 md:mx-10" />


            <div className="text-center text-xs text-gray-500 py-4 flex flex-col md:flex-row items-center justify-center gap-2">

                <p>© 2026 MovieApp. All rights reserved.</p>

                <p className="flex items-center gap-1">
                    Made with <FaHeart className="text-red-500" /> for movie lovers
                </p>

            </div>
        </footer>
    );
}