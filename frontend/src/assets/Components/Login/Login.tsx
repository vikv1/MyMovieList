import "./Login.css";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  // const [emailError, setEmailError] = useState('')
  // const [passwordError, setPasswordError] = useState('')

  const onButtonClick = () => {};

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Sign In | Create Account</div>
      </div>
      <br />
      <div className={"subtitleContainer"}>
        <div>Enter your username to get started.</div>
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
          onClick={onButtonClick}
          value={"Next"}
        />
      </div>
    </div>
  );
};

export default Login;
