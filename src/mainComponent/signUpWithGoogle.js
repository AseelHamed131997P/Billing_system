import { useDispatch } from "../hooks/index";
import { styled, mq, css } from "../ui/utils/index";
import { useSelector } from "../hooks";
import { login } from "../actions/auth";
import "./signUpWithGoogle.css";
import "../CSS/general.css";
import React, { useState } from "react";
import { InputRegister } from "../ui/subComponent/general";
import Invoice from "../svgs/invoice.svg";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

const Sky = styled.div`
  color: red;
`;
const SignUpWithGoogle = () => {
  // const [username, setUsername] = useState(""); // State to hold the username value

  // const handleUsernameChange = (e) => {
  //   setUsername(e.target.value); // Update the state with the input value
  // };
  const [googleValues, setGoogleValues] = useState({
    Username: "",
    Email: "",
    Password: "",
    Confirm_Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Changing ${name} to ${value}`);
    setGoogleValues((prevGoogleValues) => ({
      ...prevGoogleValues,
      [name]: value, // Update the specific field in the state
    }));
  };
  const handleSubmit = () => {
    console.log("goodleValues:", googleValues); // Handle form submission (e.g., log the username)
  };

  return (
    <main className="signup">
      <div className="register-box">
        <header className="box-header">
          <img
            src={Invoice}
            alt="Invoice Icon"
            class="w-9 h-9 inline-block mr-4 "
          />

          <span className="header-title">Invoice System</span>
        </header>
        <section className="box-section">
          <form className="register-form">
            <h1 className="section-title">Create Your Account</h1>
            {Object.keys(googleValues).map((key) => (
              <InputRegister
                id={key}
                handleChange={handleChange}
                values={googleValues}
              />
            ))}

            <button
              class="justify-self-center w-96 mt-4 py-2 px-4 btn"
              type="button"
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default SignUpWithGoogle;
