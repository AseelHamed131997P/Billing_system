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
  Input,
  DropDown,
} from "../ui/subComponent/general/index.js";

const AdminAndCompany = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e) => setValue(e.target.value);
  return (
    <main className="signup">
      <div className="register-box margin-auto">
        <HeaderRegister />
        <section className="box-section center-x">
          <form className="register-form">
            <h1 class="text-2xl font-semibold	">Admin</h1>
            <section class="layout">
              <Input />
              <DropDown />
              <div class="border">fdf</div>
              <div class="border">fdf</div>
            </section>
            <h1 class="text-2xl font-semibold	">Company</h1>
            <section class="layout">
              <div class="border">fdf</div>
              <div class="border">fdf</div>
              <div class="border">fdf</div>
              <div class="border">fdf</div>
            </section>
          </form>
        </section>
      </div>
    </main>
  );
};

export default AdminAndCompany;
