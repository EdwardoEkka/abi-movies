import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow rounded-lg overflow-hidden"
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-72 sm:h-80 md:h-96 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          Rating: {movie.vote_average}
        </p>
      </div>
    </div>
  );
}
