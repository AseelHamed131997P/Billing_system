import { useState } from "react"; // React import for useState
import logo_agile from "../img/logo_agile.png"; // Import logo
import ReactFlagsSelect from "react-flags-select"; // Import flags select for language selection
import "./login.css"; // Import your CSS
import "../CSS/general.css";

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom"; // React Router for navigation

const Login = () => {
  const [lang, setLang] = useState("US");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="login">
      <section className="login-form">
        <header className="login-header">
          <img
            src={logo_agile}
            alt="logo agile"
            width="180rem"
            height="180rem"
          />
          <ReactFlagsSelect
            countries={["US", "SA", "IL"]} // US for English, SA for Arabic, IL for Hebrew
            customLabels={{
              US: "English",
              SA: "العربية", // Arabic
              IL: "עברית", // Hebrew
            }}
            selected={lang}
            onSelect={(code) => setLang(code)}
            className="custom-dropdown"
          />
        </header>
        <div className="login-container">
          <form className="login-box">
            <h1 className="login-title">Welcome to Invoice System</h1>
            <div className="w-[30rem]">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="absolute w-7 h-7 top-5 left-2.5 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-4 bg-transparent placeholder:text-slate-400 text-slate-600 text-2xl border border-gray-500 rounded-full transition duration-300 ease focus:outline-none focus:shadow-[inset_0_0_0_1px_gray]"
                  placeholder="Enter your email or Phone number"
                />
              </div>
            </div>

            <div className="w-[30rem]">
              <div className="relative">
                {/* Lock icon on the left */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="absolute w-7 h-7 top-5 left-2.5 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>

                {/* Password input field */}
                <input
                  type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
                  className="w-full pl-10 pr-12 py-4 bg-transparent placeholder:text-slate-400 text-slate-600 text-2xl border border-gray-500 rounded-full transition duration-300 ease focus:outline-none focus:shadow-[inset_0_0_0_1px_gray]"
                  placeholder="Enter your password"
                />

                {/* Conditional rendering for the Eye Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="absolute w-7 h-7 top-5 right-2.5 text-slate-600 cursor-pointer"
                  onClick={togglePasswordVisibility} // Toggle password visibility on click
                >
                  {/* If showPassword is true, display the open eye icon, otherwise display the closed eye */}
                  {showPassword ? (
                    <>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </>
                  )}
                </svg>
              </div>
            </div>

            <button class="py-4 px-4 w-96 btn" type="button">
              Login
            </button>
          </form>
          <div className="login-line">
            {" "}
            <div className="or">OR</div>
          </div>
          <button
            class="  w-[40rem] tracking-wider	 rounded-full bg-gradient-to-tr from-cyan-950 to-cyan-900 py-4 px-4 text-center text-2xl text-white transition-opacity ease-in active:bg-slate-700 hover:bg-slate-700 active:opacity-50"
            type="button"
          >
            Google
          </button>
          <button
            class="  w-[40rem] tracking-wider	 rounded-full bg-gradient-to-tr from-cyan-950 to-cyan-900 py-4 px-4 text-center text-2xl text-white transition-opacity ease-in active:bg-slate-700 hover:bg-slate-700 active:opacity-50"
            type="button"
          >
            Apple
          </button>
          <button
            class=" w-[40rem] tracking-wider	 rounded-full bg-gradient-to-tr from-cyan-950 to-cyan-900 py-4 px-4 text-center text-2xl text-white transition-opacity ease-in active:bg-slate-700 hover:bg-slate-700 active:opacity-50"
            type="button"
          >
            SMS
          </button>
          <a href="/support" alt="support" className="support">
            support
          </a>
        </div>
      </section>
      <section className="login-img"></section>
    </main>
  );
};

export default Login;
