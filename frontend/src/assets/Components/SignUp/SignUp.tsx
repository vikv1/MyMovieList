import "./SignUp.css";
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
        // Redirect to /recommendations after successful signup
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

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Sign Up</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={fname}
          placeholder="Enter your first name here"
          onChange={(ev) => setFirstName(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={lname}
          placeholder="Enter your last name here"
          onChange={(ev) => setLastName(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={handleSubmit}
          value={"Create Account"}
        />
      </div>
    </div>
  );
};

export default SignUp;
