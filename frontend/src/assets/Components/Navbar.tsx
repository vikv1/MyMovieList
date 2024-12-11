import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Friends from "./Friends";
import Recommendations from "./Recommendations";

const Navbar = () => {
  const [activePage, setActivePage] = useState("recommendations");
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleHomePageClick = () => {
    navigate("/"); // Navigate to the home page ("/")
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center rotate-180 z-0"
        style={{
          backgroundImage:
            "url('src/assets/UI_Files/Backgrounds/background-3.jpg')",
        }}
      >
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
      </div>

      {/* App Icon */}
      <div className="absolute top-[95px] left-[90px] z-20">
        <button
          onClick={handleHomePageClick}
          className="relative focus:outline-none"
        >
          <img
            src="/src/assets/UI_Files/App Icon.png"
            alt="App Icon"
            className="max-w-sm relative z-10"
          />
        </button>
      </div>

      {/* Navbar */}
      <nav className="absolute top-[65px] left-1/2 transform -translate-x-1/2 bg-custom-black p-4 text-orange-400 shadow-xl rounded-3xl z-20">
        <ul className="flex space-x-7">
          <li
            className={`${
              activePage === "friends"
                ? "bg-navbar-button-select-color bg-opacity-50 text-orange-400 rounded-2xl shadow-sm"
                : ""
            }`}
          >
            <button
              onClick={() => setActivePage("friends")}
              className="hover:bg-navbar-button-select-color hover:text-orange-400 text-lg px-5 py-5 rounded-2xl transition-all"
            >
              Friends
            </button>
          </li>
          <li
            className={`${
              activePage === "recommendations"
                ? "bg-navbar-button-select-color bg-opacity-50 text-orange-400 rounded-2xl"
                : ""
            }`}
          >
            <button
              onClick={() => setActivePage("recommendations")}
              className="hover:bg-navbar-button-select-color hover:text-orange-400 text-lg px-5 py-5 rounded-2xl transition-all"
            >
              Recommendations
            </button>
          </li>
        </ul>
      </nav>

      {/* Input Field */}
      <div className="absolute top-[250px] left-1/2 transform -translate-x-1/2 z-30">
        <div className="relative flex items-center w-[1150px] h-[55px] bg-search-bar-color text-white rounded-full shadow-xl">
          <div className="flex items-center justify-center w-[55px] h-[55px] bg-search-container-color rounded-full shadow-xl">
            <img
              src="/src/assets/UI_Files/Search.png"
              alt="Icon"
              className="w-[30px] h-[30px]"
            />
          </div>
          <input
            type="text"
            placeholder={
              activePage === "recommendations"
                ? "Enter the friend's username you want to recommend to"
                : "Enter the friend's username you want to add"
            }
            className="flex-1 bg-transparent placeholder-gray-400 text-xl text-white px-5 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (activePage === "recommendations") {
                  setUsername(searchQuery);
                }
              }
            }}
          />
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="relative mt-[170px] z-10 flex flex-1 justify-center items-center overflow-hidden">
        {/* Adjusted `mt-[330px]` for 250px search bar + 40px gap */}
        {activePage === "recommendations" ? (
          <Recommendations username={username} />
        ) : (
          <Friends />
        )}
      </div>
    </div>
  );
};

export default Navbar;
