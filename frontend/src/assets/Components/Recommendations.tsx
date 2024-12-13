import React, { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";

interface Movie {
  title: string;
  posterUrl: string | null;
  recommender: string;
}

interface RecommendationsProps {
  username: string;
}

const Recommendations = ({ username }: RecommendationsProps) => {
  const [movies, setMovies] = useState<Movie[]>([]); // Explicit type definition for movie objects
  const [isLoading, setIsLoading] = useState(false);

  const POSTERDB_API_KEY = import.meta.env.VITE_POSTERDB_API_KEY;

  if (!POSTERDB_API_KEY) {
    console.error("API Key is missing. Check your .env setup.");
  }

  useEffect(() => {
    if (username.trim().length > 0) {
      setIsLoading(true);
      axios
        .get("http://127.0.0.1:5000/viewRecommendations", {
          params: { user_name: username },
        })
        .then((res) => {
          const movieData: { movieTitle: string; recommender: string }[] =
            res.data; // Explicitly define the structure of the movie data

          // Fetch posters for each movie
          const fetchPosters = movieData.map(({ movieTitle, recommender }) =>
            axios
              .get(
                `https://api.themoviedb.org/3/search/movie?api_key=${POSTERDB_API_KEY}&query=${encodeURIComponent(
                  movieTitle
                )}`
              )
              .then((response) => {
                const results = response.data.results;
                if (results.length > 0) {
                  // Use fuzzy matching to find the best match if necessary
                  const fuse = new Fuse(results, { keys: ["title"] });
                  const bestMatch =
                    fuse.search(movieTitle)[0]?.item || results[0]; // Get best match
                  const posterPath = bestMatch?.poster_path || null;
                  return {
                    title: bestMatch?.title || movieTitle, // Use the title from the API result
                    posterUrl: posterPath
                      ? `https://image.tmdb.org/t/p/w500${posterPath}`
                      : null,
                    recommender,
                  };
                }
                return {
                  title: movieTitle,
                  posterUrl: null,
                  recommender,
                };
              })
              .catch(() => ({
                title: movieTitle,
                posterUrl: null,
                recommender,
              }))
          );

          Promise.all(fetchPosters).then((moviesWithPosters) => {
            setMovies(moviesWithPosters);
          });
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-3xl">
        Getting Recommendations for {username}...
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center min-h-screen min-w-screen text-white text-3xl p-[20px]">
      {movies.length > 0 ? (
        <div className="text-center bg-transparent rounded-2xl shadow-lg max-w-[1930px] p-[5px] h-[70vh] overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex custom-scrollbar px-[50px] py-[50px]">
            <div className="grid grid-cols-4 gap-x-[30px]">
              {movies.map((movie, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center transform transition-all duration-300 ease-in-out hover:scale-105"
                >
                  <div className="bg-navbar-button-select-color bg-opacity-60 rounded-2xl shadow-lg w-[350px] px-[30px] py-[30px]  mb-[50px] hover:shadow-2xl hover:bg-opacity-100 flex flex-col items-center">
                    {/* Movie Poster and Line Separator */}
                    <div className="relative flex flex-col items-center">
                      <img
                        src={
                          movie.posterUrl ||
                          "/src/assets/UI_Files/HarryPotterSS.jpg"
                        } // Default poster if not found
                        alt={movie.title}
                        className="w-[300px] h-[400px] object-cover rounded-xl"
                      />
                      {/* Line Separator */}
                      <img
                        src="/src/assets/UI_Files/Line.png"
                        alt="Separator"
                        className="w-[400px] h-[2px] mt-[20px]"
                      />
                      {/* Heart Icon */}
                      <button className="absolute bottom-8 right-2.5 shadow-lg bg-black bg-opacity-30 p-[5px] rounded-lg">
                        <img
                          src="/src/assets/UI_Files/Heart.png"
                          alt="Favorite"
                          className="w-8 h-8 cursor-pointer"
                        />
                      </button>
                    </div>

                    {/* Movie Number, Title, and Recommender */}
                    <div className="flex pl-[10px] mt-[20px] items-center">
                      {/* Index */}
                      <div className="w-[66px] h-[66px] flex justify-center items-center bg-movie-number-color text-orange-500 font-bold rounded-xl">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </div>

                      {/* Title and Recommender */}
                      <div className="ml-[20px] text-orange-500 text-lg font-bold text-left break-words w-[210px]">
                        <div>{movie.title}</div>
                        <div className="text-sm text-gray-400">
                          Recommender: {movie.recommender}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-orange-300">
          {username.trim().length === 0
            ? "Enter a username"
            : "No recommendations found for " + username + "."}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
