import { useState } from "react"; // React import for useState
import logo_agile from "../img/logo_agile.png"; // Import logo
import "./login.css"; // Import your CSS
import "../CSS/general.css";
import { LangSelect } from "../ui/subComponent/general";
import { useTranslation } from "react-i18next";
import { LOGIN_SUCCESS } from "../actions/types.js";
import { Navigate } from "react-router-dom";

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom"; // React Router for navigation
import { useDispatch, useSelector } from "react-redux"; // ✅ Correct
import { ShowHiddenIcon, PasswordIcon, UsernameIcon } from "../svgs/index.js";
import background from "../img/background.jpg";
const Login = () => {
  const dispatch = useDispatch();
  const [lang, setLang] = useState("US");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = () => {
    if (username && password) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: {
            registerCompany: "true",
            username,
            password,
          },
        },
      });
    }
  };
  return (
    <main className=" h-screen grid-2-cols">
      <section className="grid-2-rows-auto-1fr">
        <header className="flex-center-v-space-between px-3">
          <img
            src={logo_agile}
            alt="logo agile"
            width="180rem"
            height="180rem"
          />
          <LangSelect />
        </header>
        <div className="flex-vx-center flex-col gap-[2.4rem]">
          <form className="flex-vx-center flex-col gap-[1.6rem]">
            <h1 className="text-[2.4rem] font-medium mb-[1.2rem]">
              Welcome to Invoice System
            </h1>
            <div className="w-[30rem]">
              <div className="relative">
                <UsernameIcon />
                <input
                  type="text"
                  className=" pr-3 input-login"
                  placeholder="Enter your email or Phone number"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="w-[30rem]">
              <div className="relative">
                <PasswordIcon />
                <input
                  type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
                  className=" pr-12 input-login"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <ShowHiddenIcon
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
              </div>
            </div>

            <button
              className=" btn py-2 px-4 w-96  "
              type="button"
              onClick={loginSubmit}
            >
              Login
            </button>
          </form>
          <div className="w-[60%] border border-[#b1aeae] relative mb-[2rem]">
            {" "}
            <div className="flex-vx-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full bg-white text-[1rem] font-medium tracking-[0.2rem]">
              OR
            </div>
          </div>
          <button
            className=" py-2 px-4 w-[40rem]  btn"
            type="button"
            onClick={() => navigate("/signUp")} // ✅ Correct way to navigate
          >
            Sign up
          </button>
          {/* <button
            className=" py-2 px-4 w-[40rem]  btn"
            type="button"
            onClick={() => navigate("/signUpWithGoogle")} // ✅ Correct way to navigate
          >
            Sign up
          </button> */}
          <button className=" py-2 px-4 w-[40rem]  btn" type="button">
            Google
          </button>
          <button className=" py-2 px-4 w-[40rem] btn" type="button">
            Apple
          </button>
          <button className="py-2 px-4 w-[40rem] btn" type="button">
            SMS
          </button>
          <a
            href="/support"
            alt="support"
            className="text-[1.5rem] font-normal underline"
          >
            support
          </a>
        </div>
      </section>
      <section className="login-img">
        <img
          src={background}
          alt="background"
          className="w-full h-full object-cover"
        />
      </section>
    </main>
  );
};

export default Login;
