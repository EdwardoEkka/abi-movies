import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SimilarMovies from "../components/SimilarMovies";

const apiKey = "2a10a0ab87a04d94f36cab1f257bc9e2";

export default function MovieDetailsFullScreen() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movie details
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Fetch similar movies
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => setSimilarMovies(data.results || []))
      .catch(err => console.error(err));
  }, [id]);

  if (loading || !movie)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="w-full min-h-screen relative">
      {/* Full-screen backdrop */}
      <div
        className="absolute w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />
      <div className="absolute w-full h-full bg-black/70" />

      {/* Movie content */}
      <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-16 text-white flex flex-col gap-6">
        {/* Header */}
        <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
        {movie.tagline && (
          <p className="text-lg md:text-2xl italic text-gray-300">{movie.tagline}</p>
        )}

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
          />

          {/* Details */}
          <div className="flex-1 flex flex-col gap-3">
            <p className="text-gray-200">{movie.overview}</p>

            {/* Info */}
            <div className="flex flex-wrap gap-4 text-gray-300">
              <span>⭐ {movie.vote_average} ({movie.vote_count} votes)</span>
              <span>🎬 {movie.runtime} min</span>
              <span>📅 {movie.release_date}</span>
              <span>Status: {movie.status}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map(g => (
                <span
                  key={g.id}
                  className="bg-purple-600 px-3 py-1 rounded-full text-sm"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold transition"
                >
                  Official Site
                </a>
              )}
            </div>

            {/* Production logos */}
            <div className="flex flex-wrap gap-4 mt-6 items-center">
              {movie.production_companies.map(c =>
                c.logo_path ? (
                  <img
                    key={c.id}
                    src={`https://image.tmdb.org/t/p/w92${c.logo_path}`}
                    alt={c.name}
                    className="h-10 object-contain"
                  />
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* Similar movies */}
        <SimilarMovies movies={similarMovies}/>
      </div>
    </div>
  );
}
