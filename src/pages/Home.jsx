import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const apiKey = "2a10a0ab87a04d94f36cab1f257bc9e2";

const categories = [
  { id: "popular", label: "Popular" },
  { id: "top_rated", label: "Top Rated" },
  { id: "upcoming", label: "Upcoming" },
  { id: "now_playing", label: "Now Playing" },
];

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [categoriesList] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Fetch genres
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.genres?.length) {
          setGenres(data.genres);
          setSelectedGenre(data.genres[0].id);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch movies
  useEffect(() => {
    setLoading(true);
    let url = "";

    if (searchQuery) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        searchQuery
      )}`;
    } else if (selectedGenre) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&sort_by=popularity.desc`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${selectedCategory}?api_key=${apiKey}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedCategory, selectedGenre, searchQuery]);

  // Show Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        TMDB Clone
      </h1>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center flex-wrap gap-3 mb-6">
        {categoriesList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setSelectedGenre(null);
              setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedCategory === cat.id
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-purple-500 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Genre Tabs */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => {
              setSelectedGenre(genre.id);
              setSelectedCategory("");
              setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedGenre === genre.id
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-purple-500 hover:text-white"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
        >
          ↑
        </button>
      )}
    </div>
  );
}
