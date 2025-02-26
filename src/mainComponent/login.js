import { useState } from "react"; // React import for useState
import logo_agile from "../img/logo_agile.png"; // Import logo
import "./login.css"; // Import your CSS
import "../CSS/general.css";
import { LangSelect } from "../ui/subComponent/general";
import { useTranslation } from "react-i18next";
import { LOGIN_SUCCESS } from "../actions/types.js";
import { Navigate } from "react-router-dom";
import { Apple, MessageSquare } from "lucide-react";

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom"; // React Router for navigation
import { useDispatch, useSelector } from "react-redux"; // ✅ Correct
import { ShowHiddenIcon, PasswordIcon, UsernameIcon } from "../svgs/index.js";
import background from "../img/new.jpg";
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
          <h2 className="text-3xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-gray-600">
            Choose your preferred sign up method
          </p>
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
          {/* <button className=" py-2 px-4 w-[40rem]  btn" type="button">
            Google
          </button> */}

          <button
            className="py-2 px-4 w-[40rem] text-2xl flex items-center justify-center gap-3 bg-white text-gray-700  rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
            onClick={() => console.log("Google sign up clicked")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>

          <button
            className="py-2 px-4 w-[40rem] text-2xl flex items-center justify-center gap-3 bg-black text-white  rounded-full hover:bg-gray-900 transition-all duration-200"
            onClick={() => console.log("Apple sign up clicked")}
          >
            <Apple className="w-5 h-5" />
            Sign up with Apple
          </button>

          <button
            className="py-2 px-4 w-[40rem] text-2xl flex items-center justify-center gap-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200"
            onClick={() => console.log("SMS sign up clicked")}
          >
            <MessageSquare className="w-5 h-5" />
            Sign up with SMS
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
