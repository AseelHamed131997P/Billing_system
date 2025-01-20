import { useState } from "react"; // React import for useState
import logo_agile from "../img/logo_agile.png"; // Import logo
import "./login.css"; // Import your CSS
import "../CSS/general.css";
import { LangSelect } from "../ui/subComponent/general";
import { useTranslation } from "react-i18next";

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom"; // React Router for navigation

import { ShowHiddenIcon, PasswordIcon, UsernameIcon } from "../svgs/index.js";

const Login = () => {
  const [lang, setLang] = useState("US");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { t } = useTranslation();

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
                />

                <ShowHiddenIcon
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
              </div>
            </div>

            <button className=" btn py-2 px-4 w-96  " type="button">
              Login
            </button>
          </form>
          <div className="w-[60%] border border-[#b1aeae] relative mb-[2rem]">
            {" "}
            <div className="flex-vx-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full bg-white text-[1rem] font-medium tracking-[0.2rem]">
              OR
            </div>
          </div>
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
      <section className="login-img"></section>
    </main>
  );
};

export default Login;
