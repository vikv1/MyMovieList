import "./SignUp.css";
import { useState } from "react";

const SignUp = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  // const [emailError, setEmailError] = useState('')
  // const [passwordError, setPasswordError] = useState('')

  const onButtonClick = () => {};

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Sign Up</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={firstName}
          placeholder="Enter your first name here"
          onChange={(ev) => setfirstName(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={lastName}
          placeholder="Enter your last name here"
          onChange={(ev) => setlastName(ev.target.value)}
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
          onClick={onButtonClick}
          value={"Sign Up"}
        />
      </div>
    </div>
  );
};

export default SignUp;
