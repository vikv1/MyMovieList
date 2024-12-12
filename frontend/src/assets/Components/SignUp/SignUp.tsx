import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";

const SignUp = () => {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        fname,
        lname,
        username,
      });

      if (response.status === 200) {
        setMessage("Signed up!");
        // Redirect to /navbar after successful signup
        navigate("/navbar");
      }
    } catch (error: AxiosError | any) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleSignInClick = () => {
    navigate("/login"); // Redirect to the login page
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
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      </div>

      {/* App Icon */}
      <div className="absolute top-[45px] left-[40px] z-20">
        <button className="relative focus:outline-none">
          <img
            src="/src/assets/UI_Files/App Icon.png"
            alt="App Icon"
            className="max-w-sm relative z-10"
          />
        </button>
      </div>

      {/* Login Button */}
      <div className="absolute top-[45px] right-[40px] z-20">
        <div className="mb-4">
          <button
            onClick={handleSignInClick}
            className="w-full flex justify-center items-center p-4 rounded-lg cursor-pointer hover:opacity-80 focus:outline-none"
          >
            <img
              src="/src/assets/UI_Files/Log In.png"
              alt="Sign In"
              className="h-8 w-auto"
            />
          </button>
        </div>
      </div>

      {/* Title Container */}
      <div className="relative z-20 flex items-center justify-center flex-col min-h-screen">
        {/* Introductory Text */}
        <div className="text-center text-white mb-4">
          <p className="text-3xl">Ready to explore the world of movies?</p>
          <p className="text-lg">Enter your details to create an account.</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-search-bar-color bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-2xl font-semibold mb-4 text-white">SIGN UP</div>

          {/* First Name Input */}
          <div className="mb-4">
            <input
              value={fname}
              placeholder="Enter your first name here"
              onChange={(ev) => setFirstName(ev.target.value)}
              className="w-full p-2 bg-custom-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Last Name Input */}
          <div className="mb-4">
            <input
              value={lname}
              placeholder="Enter your last name here"
              onChange={(ev) => setLastName(ev.target.value)}
              className="w-full p-2 bg-custom-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Username Input */}
          <div className="mb-4">
            <input
              value={username}
              placeholder="Enter your username here"
              onChange={(ev) => setUsername(ev.target.value)}
              className="w-full p-2 bg-custom-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Create Account Button */}
          <div className="mb-4">
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center items-center p-4 rounded-lg cursor-pointer hover:opacity-80 focus:outline-none"
            >
              <img
                src="/src/assets/UI_Files/Sign Up Button.png"
                alt="Create Account"
                className="h-10 w-auto"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
