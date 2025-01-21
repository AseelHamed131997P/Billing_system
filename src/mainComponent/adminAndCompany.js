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
  Signature,
  FileInput,
} from "../ui/subComponent/general/index.js";
import image_name from "../img/image_name.png";
import { Fi } from "react-flags-select";

const AdminAndCompany = () => {
  const [signatureComp, setSignaureComp] = useState({
    urlSign: null,
    urlFile: null,
  }); // here save the signature value just when not null if null does not save

  const [signatureAdmin, setSignaureAdmin] = useState({
    urlSign: null,
    urlFile: null,
  }); // here save the signature value just when not null if null does not save

  console.log(`test urlSign ${signatureComp.urlSign}`);
  console.log(`test urlFile ${signatureComp.urlFile}`);

  return (
    <main className="signup">
      <div className="register-box margin-auto">
        <HeaderRegister />
        <section className="box-section center-x">
          <form className="register-form">
            <h1 className="text-2xl font-semibold">Admin</h1>
            <section className="border grid grid-cols-2 gap-5 place-items-center">
              <Input />
              <DropDown />
              <div className="w-full border-2 ">
                <p className="text-lg	font-medium	 center-x">
                  Enter your signature
                </p>
                <Signature
                  setSignature={setSignaureComp}
                  signature={signatureComp}
                />
              </div>

              <div className="border col-start-2 row-span-2 center-x">
                {signatureComp.urlSign || signatureComp.urlFile ? (
                  <img
                    src={
                      signatureComp.urlSign && signatureComp.urlFile
                        ? signatureComp.urlFile // Show urlFile if both exist
                        : signatureComp.urlSign || signatureComp.urlFile // Show the existing URL
                    }
                    alt="Signature"
                    className="w-[18rem] h-[9rem]"
                  />
                ) : (
                  "Admin Signature"
                )}
              </div>

              <div className="border w-full flex-vx-center flex-col">
                <div>OR </div>
                <FileInput
                  setFile={setSignaureComp}
                  file={signatureComp}
                  name={"Choose Signature File"}
                />
              </div>

              <div className="border">fdf</div>
              <div className="border">fdf</div>
              <div className="border">fdf</div>
            </section>
            <h1 className="text-2xl font-semibold">Company</h1>
            <section className="layout">
              <div className="border">fdf</div>
              <div className="border">fdf</div>
              <div className="border">fdf</div>
              <div className="border">fdf</div>
            </section>
          </form>
        </section>
      </div>
    </main>
  );
};

export default AdminAndCompany;
