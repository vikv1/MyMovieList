import React, { useState, useEffect } from "react";
import axios from "axios";

interface RecommendationsProps {
  username: string;
}

const Recommendations = ({ username }: RecommendationsProps) => {
  const [movies, setMovies] = useState<string[]>([]); // State to store movie list
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  useEffect(() => {
    if (username.trim().length > 0) {
      setIsLoading(true); // Start loading
      axios
        .get("http://127.0.0.1:5000/viewRecommendations", {
          params: { user_name: username }, // Pass query parameters
        })
        .then((res) => {
          const htmlResponse = res.data; // Get the HTML response
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlResponse, "text/html");

          // Scrape the movie titles from <li> tags
          const movieElements = doc.querySelectorAll("ul li");
          const moviesList = Array.from(movieElements).map(
            (li) => li.textContent || ""
          );
          setMovies(moviesList); // Store the movies in state
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        })
        .finally(() => {
          setIsLoading(false); // Stop loading
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
    <div className="absolute inset-0 flex justify-center items-center min-h-screen min-w-screen text-white text-3xl p-[16px]">
      {movies.length > 0 ? (
        <div className="text-center bg-transparent rounded-2xl shadow-lg max-w-[1230px] w-full p-[15px] h-[70vh] overflow-hidden flex flex-col">
          <h1 className="text-orange-500 text-4xl pb-10">
            Recommendations for {username}:
          </h1>

          <div className="overflow-y-auto flex custom-scrollbar px-[40px] py-[10px]">
            <div className="grid grid-cols-2 gap-x-[105px]">
              {movies.map((movie, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-105"
                >
                  <div className="flex flex-col items-center justify-between bg-navbar-button-select-color bg-opacity-50 rounded-2xl shadow-lg w-full p-[15px] mb-6 hover:shadow-2xl hover:bg-opacity-70">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-[24px]">
                        <div className="w-[66px] h-[66px] flex items-center justify-center bg-movie-number-color text-orange-500 font-bold rounded-xl">
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </div>
                        <div className="text-orange-500 text-2xl">{movie}</div>
                      </div>
                      <button>
                        <img
                          src="/src/assets/UI_Files/Heart.png" // Dummy path for the heart icon
                          alt="Favorite"
                          className="w-6 h-6 text-orange-500 cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Line as an image with spacing */}
                  <img
                    src="/src/assets/UI_Files/Line.png" // Dummy path for the line image
                    alt="Separator"
                    className="w-full h-1 my-[35px] transition-none" // No transition applied to the line
                  />
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
