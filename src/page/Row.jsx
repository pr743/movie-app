import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

export default function Row({ title, movies }) {
    const rowRef = useRef(null);
    const navigate = useNavigate();

    const scroll = (direction) => {
        const scrollAmount = 400;

        if (!rowRef.current) return;

        rowRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="px-4 md:px-10 mt-8 md:mt-12 group relative">


            <div className="flex justify-between items-center mb-3 md:mb-4">
                <h2 className="text-lg md:text-2xl font-bold">{title}</h2>

                <button
                    onClick={() => navigate(`/movies?category=${title}`)}
                    className="text-xs md:text-sm text-gray-400 hover:text-white transition"
                >
                    See More →
                </button>
            </div>

            <div className="hidden md:block absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />


            <div className="hidden md:block absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />


            <button
                onClick={() => scroll("left")}
                className="hidden md:flex opacity-0 group-hover:opacity-100 transition
                absolute left-2 top-1/2 -translate-y-1/2 z-20
                bg-black/60 hover:bg-black p-3 rounded-full"
            >
                <FaChevronLeft />
            </button>


            <div
                ref={rowRef}
                className="
                flex gap-3 md:gap-5 
                overflow-x-auto scroll-smooth 
                scrollbar-hide 
                snap-x snap-mandatory
                "
            >
                {movies.map((m) => (
                    <div
                        key={m._id}
                        onClick={() => navigate(`/movie/${m._id}`)}
                        className="min-w-[130px] md:min-w-[180px] cursor-pointer snap-start group/item"
                    >

                        <div className="relative overflow-hidden rounded-lg md:rounded-xl">

                            <img
                                src={m.posterUrl}
                                alt={m.title}
                                className="h-44 md:h-64 w-full object-cover 
                                transition duration-300 group-hover/item:scale-110"
                            />


                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/item:opacity-100 transition flex items-center justify-center">

                                <div className="bg-white text-black p-2 md:px-4 md:py-2 rounded-full shadow-lg">
                                    <FaPlay />
                                </div>

                            </div>
                        </div>


                        <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-300 group-hover/item:text-white truncate">
                            {m.title}
                        </p>
                    </div>
                ))}
            </div>


            <button
                onClick={() => scroll("right")}
                className="hidden md:flex opacity-0 group-hover:opacity-100 transition
                absolute right-2 top-1/2 -translate-y-1/2 z-20
                bg-black/60 hover:bg-black p-3 rounded-full"
            >
                <FaChevronRight />
            </button>
        </div>
    );
}