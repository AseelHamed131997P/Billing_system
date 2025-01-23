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
import {
  Input,
  Signature,
  FileInput,
} from "../ui/subComponent/general/index.js";
const UserModal = (props) => {
  const [userInfo, setUserInfo] = useState({
    Name_In_Arabic: null,
    Name_In_English: null,
    Name_In_Hebrew: null,
    Email: null,
    ID_NO: null,
    Mobile_NO: null,
    User_Name: null,
    Password: null,
  });

  const handleChangeUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let labels = [
    "الاسم بالعربي",
    "Name In English",
    "שם בעברית",
    "Email",
    "ID NO",
    "Mobile NO",
    "Username",
    "Password",
  ];
  const [signatureUser, setSignatureUser] = useState({
    urlSign: null,
    urlFile: null,
  }); // here save the signature value just when not null if null does not save
  console.log(`test  user urlSign ${signatureUser.urlSign}`);
  console.log(`test user urlFile ${signatureUser.urlFile}`);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
      <div className=" bg-white rounded-lg shadow-lg p-6 border w-full max-w-[60rem]">
        <h1 className="text-3xl font-bold mb-[3.2rem]">
          Add another User For Company
        </h1>

        <section className="mb-[3.2rem] grid-2-cols-center-v gap-10  ">
          {Object.keys(userInfo).map((key, index) => (
            <Input
              key={key}
              name={key}
              value={userInfo[key]}
              handleChange={handleChangeUserInfo}
              label={labels[index]}
              width="w-full"
            />
          ))}
          <div className="  col-start-1">
            <p className="text-lg	font-medium	 center-x">User Signature</p>
            <Signature
              setSignature={setSignatureUser}
              signature={signatureUser}
            />
          </div>

          <div className="border col-start-2 row-span-2 center-x">
            {signatureUser.urlSign || signatureUser.urlFile ? (
              <img
                src={
                  signatureUser.urlSign && signatureUser.urlFile
                    ? signatureUser.urlFile // Show urlFile if both exist
                    : signatureUser.urlSign || signatureUser.urlFile // Show the existing URL
                }
                alt="Signature"
                className="w-[18rem] h-[9rem]"
              />
            ) : (
              "User Signature"
            )}
          </div>

          <div className=" w-full col-start-1  flex-vx-center flex-col  ">
            <div className="transform -translate-y-[1.2rem]  font-semibold text-xl tracking-[0.2rem]">
              OR{" "}
            </div>
            <FileInput
              setFile={setSignatureUser}
              file={signatureUser}
              name={"Choose Signature Image"}
            />
          </div>
        </section>
        <div className="flex justify-end space-x-[2.4rem]">
          <button
            onClick={props.toggleModal}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={props.toggleModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
