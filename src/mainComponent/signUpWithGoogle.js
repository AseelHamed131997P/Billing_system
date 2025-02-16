import { useDispatch } from "../hooks/index";
import { styled, mq, css } from "../ui/utils/index";
import { useSelector } from "../hooks";
import { login } from "../actions/auth";
import "./signUpWithGoogle.css";
import "../CSS/general.css";
import React, { useState } from "react";
import { LOGIN_SUCCESS } from "../actions/types.js";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import { useEffect } from "react";

import {
  InputRegister,
  HeaderRegister,
  CheckBox,
} from "../ui/subComponent/general/index.js";

const SignUpWithGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function

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

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
    // Check if all fields are filled (none should be empty)
    const allFieldsFilled = Object.values(googleValues).every(
      (value) => value.trim() !== ""
    );

    if (allFieldsFilled) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: {
            registerCompany: "false",
            username: googleValues.Username,
            password: googleValues.Password,
          },
        },
      });
      // navigate("/adminAndCompany");
    } else {
      console.log("googleValues:", googleValues); // Handle form submission (e.g., log the username)
    }
  };

  return (
    <main className="signup">
      <div className="register-box margin-auto">
        <HeaderRegister />
        <section className="box-section center-x">
          <form className="register-form">
            <h1 className="section-title">Create Your Account</h1>
            {Object.keys(googleValues).map((key) => (
              <InputRegister
                id={key}
                handleChange={handleChange}
                values={googleValues}
              />
            ))}
            <CheckBox
              isChecked={isChecked}
              handleChange={handleCheckboxChange}
              label="free trial"
            />
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
