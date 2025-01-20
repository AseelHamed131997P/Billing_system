import { useDispatch } from "../hooks/index";
import { styled, mq, css } from "../ui/utils/index";
import { useSelector } from "../hooks";
import { login } from "../actions/auth";
import "./signUpWithGoogle.css";
import "../CSS/general.css";
import {
  InputRegister,
  HeaderRegister,
  CheckBox,
} from "../ui/subComponent/general/index.js";
import React, { useState, useRef } from "react";

const OTP = () => {
  const onComplete = (otp) => {
    console.log("OTP Entered:", otp);
    // You can add your logic here to handle the complete OTP
  };
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <main className="signup">
      <div className="register-box margin-auto">
        <HeaderRegister />
        <section className="box-section center-x">
          <h3>enter your code</h3>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default OTP;
