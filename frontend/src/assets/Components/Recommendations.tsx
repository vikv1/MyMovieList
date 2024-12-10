import React, { useState, useEffect } from "react";
import axios from "axios";

interface RecommendationsProps {
  username: string;
}

const Recommendations = ({ username }: RecommendationsProps) => {
  const [response, setResponse] = useState(null); // State to store response
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  useEffect(() => {
    if (username.trim().length > 0) {
      setIsLoading(true); // Start loading
      axios
        .get("http://127.0.0.1:5000/viewRecommendations", {
          params: { user_name: username }, // Pass query parameters
        })
        .then((res) => {
          console.log(res.data);
          setResponse(res.data); // Store the API response
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
    <div className="absolute inset-0 flex justify-center items-center min-h-screen min-w-screen text-white text-3xl">
      {response ? (
        <div className="text-center  bg-gray-800 rounded-lg shadow-lg max-w-6xl w-full">
          <h1 className="mb-4 text-orange-300">
            Recommendations for {username}:
          </h1>
          <pre className="text-orange-300 bg-gray-800 p-20 rounded-lg whitespace-pre-line">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="text-center text-orange-300">
          No recommendations found or waiting for input.
        </div>
      )}
    </div>
  );
};

export default Recommendations;
