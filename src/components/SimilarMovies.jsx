import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import MovieCard from "../components/MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const ArrowLeft = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);
  return (
    <button
      onClick={() => scrollPrev()}
      className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full z-10 hover:bg-black/80 transition"
    >
      <FaChevronLeft />
    </button>
  );
};

const ArrowRight = () => {
  const { scrollNext } = React.useContext(VisibilityContext);
  return (
    <button
      onClick={() => scrollNext()}
      className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full z-10 hover:bg-black/80 transition"
    >
      <FaChevronRight />
    </button>
  );
};

export default function SimilarMovies({ movies }) {
  return (
    <div className="mt-12 relative">
      <h2 className="text-3xl font-bold mb-6 px-2 md:px-0">You May Also Like</h2>

      <ScrollMenu
        LeftArrow={ArrowLeft}
        RightArrow={ArrowRight}
        className="overflow-x-auto scrollbar-hide"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            itemId={movie.id}
            className="flex-none w-48 md:w-56 lg:w-60 px-3 snap-start"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </ScrollMenu>
    </div>
  );
}
