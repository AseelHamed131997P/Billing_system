import { useDispatch } from "../hooks/index";
import { styled, mq, css } from "../ui/utils/index";
import { useSelector } from "../hooks";
import { login } from "../actions/auth";
import "./signUpWithGoogle.css";
import "../CSS/general.css";
import React, { useState } from "react";
import {
  InputRegister,
  HeaderRegister,
  CheckBox,
} from "../ui/subComponent/general/index.js";

const SignUpWithSMS = () => {
  const [SMSValues, setSMSValues] = useState({
    Username: "",
    Phone: "",
    Password: "",
    Confirm_Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Changing ${name} to ${value}`);
    setSMSValues((prevSMSValues) => ({
      ...prevSMSValues,
      [name]: value, // Update the specific field in the state
    }));
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
    console.log("SMSValues:", SMSValues); // Handle form submission (e.g., log the username)
  };

  return (
    <main className="signup">
      <div className="register-box margin-auto">
        <HeaderRegister />
        <section className="box-section center-x">
          <form className="register-form">
            <h1 className="section-title">Create Your Account</h1>
            {Object.keys(SMSValues).map((key) => (
              <InputRegister
                id={key}
                handleChange={handleChange}
                values={SMSValues}
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

export default SignUpWithSMS;
