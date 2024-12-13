import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";

const Login = () => {
  const [user, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignInClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/isuser", {
        user,
      });
      console.log(response.data);
      if (response.data.existing) {
        console.log("Logging in...");
        navigate("/navbar");
      } else {
        setMessage("User does not exist. Please sign up.");
      }
    } catch (error: AxiosError | any) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the sign-up page
  };

  const handleHomePageClick = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('src/assets/UI_Files/Backgrounds/background-3.jpg')",
        }}
      />
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      {/* Header */}
      <div className="absolute top-[95px] left-[90px] z-30">
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

      <div className="absolute top-[87.5px] right-[90px] z-30">
        <button
          onClick={handleSignUpClick}
          className="flex items-center w-[190px] h-[64px] bg-gradient-to-r from-Login-Gradient-Start via-Login-Gradient-Via to-Login-Gradient-End rounded-full hover:opacity-90"
        >
          <div className="flex items-center justify-center w-[64px] h-[64px] bg-Login-Icon-Color shadow-md rounded-full">
            <img
              src="/src/assets/UI_Files/Login.png"
              alt="Icon"
              className="w-[23px] h-[23px]"
            />
          </div>
          <span className="font-bold text-white pl-[30px] pr-[30px] py-[20px] ">
            Sign Up
          </span>
        </button>
      </div>

      {/* Form Section */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-[20px]">
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-lg">Enter your username to log in.</p>
        </div>
        <form
          onSubmit={handleSignInClick}
          className="bg-Form-Container-Color bg-opacity-90 p-8 rounded-2xl shadow-xl w-[550px] h-[260px] relative"
        >
          <div className="mb-[40px] relative">
            <label className="block mb-2 text-sm font-bold">USERNAME</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Please enter your username"
              className="w-full p-4 bg-Field-Container-Color rounded-md border border-Field-Container-Color focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <div
              className="text-sm text-red-500 mt-1 absolute"
              style={{ top: "100%", left: "0" }}
            >
              {message}
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center ml-[107.5px] w-[265px] h-[64px] bg-gradient-to-r from-Login-Gradient-Start via-Login-Gradient-Via to-Login-Gradient-End rounded-full hover:opacity-90"
          >
            <div className="flex items-center justify-center w-[64px] h-[64px] bg-Login-Icon-Color shadow-md rounded-full">
              <img
                src="/src/assets/UI_Files/Login.png"
                alt="Icon"
                className="w-[23px] h-[23px]"
              />
            </div>
            <span className="font-bold text-white pl-[20%] py-[20px] ">
              Log In
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
