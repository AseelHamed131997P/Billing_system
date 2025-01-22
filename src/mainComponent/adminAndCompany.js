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
  const [signatureComp, setSignatureComp] = useState({
    urlSign: null,
    urlFile: null,
  }); // here save the signature value just when not null if null does not save

  const [signatureAdmin, setSignatureAdmin] = useState({
    urlSign: null,
    urlFile: null,
  }); // here save the signature value just when not null if null does not save

  console.log(`test company page urlSign ${signatureComp.urlSign}`);
  console.log(`test company page urlFile ${signatureComp.urlFile}`);
  let companyType = [
    "Simple User",
    "Commerical With VAT NO",
    "Commerical with Free VAT NO",
    "Company Non Profit",
  ];
  const [option, setOption] = useState(companyType[0]);

  const handleChangeOption = (e) => setOption(e.target.value);
  console.log(option);

  const [adminInfo, setAdminInfo] = useState({
    Name_In_Arabic: null,
    Name_In_English: null,
    Name_In_Hebrew: null,
    Email: null,
    ID_NO: null,
    Mobile_NO: null,
  });

  const handleChangeAdminInfo = (e) => {
    const { name, value } = e.target;
    setAdminInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [companyInfo, setCompanyInfo] = useState({
    Name_In_Arabic: null,
    Name_In_English: null,
    Name_In_Hebrew: null,
    Email: null,
    ID_NO: null,
    Mobile_NO: null,
    Full_Address: null,
    City: null,
    VAT_NO: null,
  });

  const handleChangeCompanyInfo = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({
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
    "Full Address",
    "City",
    "VAT NO",
  ];

  const [companyLogo, setCompanyLogo] = useState({
    urlFile: null,
  });

  console.log(`companyLogo: ${companyLogo.urlFile}`);

  const [CompanyLicense, setCompanyLicense] = useState({
    urlFile: null,
  });
  console.log(`Company License: ${CompanyLicense.urlFile}`);

  const [invoiceNumber, setInvoiceNumber] = useState({
    start: null,
    end: null,
  });

  const handleChangeInvoiceNumber = (e) => {
    const { name, value } = e.target;
    setInvoiceNumber((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(`invoice number: ${invoiceNumber.start} _ ${invoiceNumber.end}`);

  const [deliveryNumber, setDeliveryNumber] = useState({
    start: null,
    end: null,
  });

  const handleChangeDeliveryNumber = (e) => {
    const { name, value } = e.target;
    setDeliveryNumber((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(
    `delivery number: ${deliveryNumber.start} _ ${deliveryNumber.end}`
  );

  const [invoicePhoto, setInvoicePhoto] = useState({
    urlFile: null,
  });

  console.log(`invoice Photo: ${invoicePhoto.urlFile}`);

  return (
    <main className="bg-[#f1f3f6] pt-[3.2rem] pb-[3.2rem]">
      <div className="overflow-hidden bg-white rounded-[2rem] shadow-[rgba(17,17,26,0.05)_0px_1px_0px,_rgba(17,17,26,0.1)_0px_0px_8px] margin-auto max-w-[100rem]">
        <HeaderRegister />
        <section className="box-section center-x ">
          <form className="register-form ">
            <div className="flex-center-v-space-between ">
              <DropDown
                options={companyType}
                option={option}
                setOption={setOption}
                handleChangeOption={handleChangeOption}
                label={"select your company type"}
              />
              <button className="btn py-2 px-4 w-64" type="button">
                Create Users
              </button>
            </div>
            <h1 className="text-2xl font-semibold">Admin</h1>
            <section className="layout">
              {Object.keys(adminInfo).map((key, index) => (
                <Input
                  key={key}
                  name={key}
                  value={adminInfo[key]}
                  handleChange={handleChangeAdminInfo}
                  label={labels[index]}
                />
              ))}
              <div className="w-50rem  col-start-1 col-span-2 mx-auto ">
                <p className="text-lg	font-medium	 center-x">
                  Enter Your Signature
                </p>
                <Signature
                  setSignature={setSignatureComp}
                  signature={signatureComp}
                />
              </div>

              <div className="border col-start-3 row-span-2 center-x">
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

              <div className=" w-full col-start-1 col-span-2 flex-vx-center flex-col  ">
                <div className="transform -translate-y-[1.2rem]  font-semibold text-xl tracking-[0.2rem]">
                  OR
                </div>

                <FileInput
                  setFile={setSignatureComp}
                  file={signatureComp}
                  name={"Choose Signature Image"}
                />
              </div>
            </section>
            <h1 className="text-2xl font-semibold">Company</h1>
            <section className="layout">
              {Object.keys(companyInfo).map(
                (key, index) =>
                  !(key === "VAT_NO" && option === "Simple User") && (
                    <Input
                      key={key}
                      name={key}
                      value={companyInfo[key]}
                      handleChange={handleChangeCompanyInfo}
                      label={
                        key === "ID_NO" && option === "Simple User"
                          ? `${labels[index]} (VAT NO)`
                          : labels[index]
                      }
                    />
                  )
              )}

              <div className=" col-start-1 col-span-full flex-vx-center gap-[1.2rem] px-[1.2rem]">
                <Input
                  name="start"
                  value={deliveryNumber["start"]}
                  handleChange={handleChangeDeliveryNumber}
                  label={"Delivery NO start"}
                  width="w-40"
                />{" "}
                <span>_</span>
                <Input
                  name="end"
                  value={deliveryNumber["end"]}
                  handleChange={handleChangeDeliveryNumber}
                  label={"Delivery NO end"}
                  width="w-40 mr-[3.2rem]"
                />
                <Input
                  name="start"
                  value={invoiceNumber["start"]}
                  handleChange={handleChangeInvoiceNumber}
                  label={"Invoice NO start"}
                  width="w-40"
                />{" "}
                <span>_</span>
                <Input
                  name="end"
                  value={invoiceNumber["end"]}
                  handleChange={handleChangeInvoiceNumber}
                  label={"Invoice NO end"}
                  width="w-40 mr-[3.2rem]"
                />
                <FileInput
                  setFile={setInvoicePhoto}
                  file={invoicePhoto}
                  name={"upload invoice photo"}
                />
              </div>

              <div className=" col-start-1 col-span-full flex-vx-center gap-[4.8rem]">
                <FileInput
                  setFile={setCompanyLicense}
                  file={CompanyLicense}
                  name={"Choose Company License"}
                />

                <FileInput
                  setFile={setCompanyLogo}
                  file={companyLogo}
                  name={"Choose Company Logo"}
                />
              </div>

              <div className="w-50rem  col-start-1 col-span-2 mx-auto">
                <p className="text-lg	font-medium	 center-x">
                  Enter Company Signature
                </p>
                <Signature
                  setSignature={setSignatureAdmin}
                  signature={signatureAdmin}
                />
              </div>

              <div className="border col-start-3 row-span-2 center-x">
                {signatureAdmin.urlSign || signatureAdmin.urlFile ? (
                  <img
                    src={
                      signatureAdmin.urlSign && signatureAdmin.urlFile
                        ? signatureAdmin.urlFile // Show urlFile if both exist
                        : signatureAdmin.urlSign || signatureAdmin.urlFile // Show the existing URL
                    }
                    alt="Signature"
                    className="w-[18rem] h-[9rem]"
                  />
                ) : (
                  "Company Signature"
                )}
              </div>

              <div className=" w-full col-start-1 col-span-2 flex-vx-center flex-col  ">
                <div className="transform -translate-y-[1.2rem]  font-semibold text-xl tracking-[0.2rem]">
                  OR{" "}
                </div>
                <FileInput
                  setFile={setSignatureAdmin}
                  file={signatureAdmin}
                  name={"Choose Signature Image"}
                />
              </div>
            </section>
          </form>
        </section>
      </div>
    </main>
  );
};

export default AdminAndCompany;
