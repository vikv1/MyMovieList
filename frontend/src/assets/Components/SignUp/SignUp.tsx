import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";

const SignUp = () => {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleHomePageClick = () => {
    navigate("/"); // Navigate to the home page ("/")
  };

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
    navigate("/login");
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
          onClick={handleSignInClick}
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
            Log In
          </span>
        </button>
      </div>

      {/* Form Section */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-[20px]">
          <h1 className="text-3xl font-bold mb-2">
            Ready to explore the world of movies?
          </h1>
          <p className="text-lg">Enter your details to create an account.</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-Form-Container-Color bg-opacity-90 p-8 rounded-2xl shadow-xl w-[550px] h-[480px]"
        >
          <div className="mb-[25px]">
            <label className="block mb-2 text-sm font-bold">FIRST NAME</label>
            <input
              type="text"
              value={fname}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Please enter your first name"
              className="w-full p-4 bg-Field-Container-Color rounded-md border border-Field-Container-Color focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div className="mb-[25px]">
            <label className="block mb-2 text-sm font-bold">LAST NAME</label>
            <input
              type="text"
              value={lname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Please enter your last name"
              className="w-full p-4 bg-Field-Container-Color rounded-md border border-Field-Container-Color focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div className="mb-[40px]">
            <label className="block mb-2 text-sm font-bold">USERNAME</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Please enter your username"
              className="w-full p-4 bg-Field-Container-Color rounded-md border border-Field-Container-Color focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <button
            type="submit"
            className=" flex items-center ml-[107.5px] w-[265px] h-[64px] bg-gradient-to-r from-Login-Gradient-Start via-Login-Gradient-Via to-Login-Gradient-End rounded-full hover:opacity-90"
          >
            <div className="flex items-center justify-center w-[64px] h-[64px] bg-Login-Icon-Color shadow-md rounded-full">
              <img
                src="/src/assets/UI_Files/Login.png"
                alt="Icon"
                className="w-[23px] h-[23px]"
              />
            </div>
            <span className="font-bold text-white pl-[20%] py-[20px] ">
              Sign Up
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
