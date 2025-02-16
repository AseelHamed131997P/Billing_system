import { useState } from "react"; // React import for useState
import logo_agile from "../img/logo_agile.png"; // Import logo
import "./login.css"; // Import your CSS
import "../CSS/general.css";
import { LangSelect, Number } from "../ui/subComponent/general";
import { useTranslation } from "react-i18next";
import { Header } from "./index.js";

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom"; // React Router for navigation

import {
  HeaderRegister,
  Input,
  DropDown,
  NumberValue,
  Table,
} from "../ui/subComponent/general/index.js";

const Customer = () => {
  let companyType = [
    "Simple User",
    "Commerical With VAT NO",
    "Commerical with Free VAT NO",
    "Company Non Profit",
  ];
  const [option, setOption] = useState(companyType[0]);

  const handleChangeOption = (e) => setOption(e.target.value);
  console.log(option);
  const [customerInfo, setCustomerInfo] = useState({
    Name_In_Arabic: null,
    Name_In_English: null,
    Name_In_Hebrew: null,
    Email: null,
    Mobile_NO: null,
    Full_Address: null,
    City: null,
    VAT_NO: null,
  });

  const handleChangeCustomerInfo = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let labels = [
    "الاسم بالعربي",
    "Name In English",
    "שם בעברית",
    "Email",
    "Mobile NO",
    "Full Address",
    "City",
    "VAT NO",
  ];

  const initialData = [
    { id: 1, name: "Alice", age: 25, city: "New York" },
    { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
    { id: 3, name: "Charlie", age: 35, city: "Chicago" },
  ];

  const [data, setData] = useState(initialData);

  return (
    <>
      <Header />
      <main className="bg-[#f1f3f6] pt-[3.2rem] pb-[3.2rem]">
        <div className="overflow-hidden bg-white rounded-[2rem] shadow-[rgba(17,17,26,0.05)_0px_1px_0px,_rgba(17,17,26,0.1)_0px_0px_8px] margin-auto max-w-[100rem]">
          <HeaderRegister />
          <section className="box-section center-x">
            <form className="register-form border p-10 rounded-[20px]">
              <div className="flex-center-v-space-between ">
                <DropDown
                  options={companyType}
                  option={option}
                  setOption={setOption}
                  handleChangeOption={handleChangeOption}
                  label={"select customer company type"}
                />
                <NumberValue label="Customer" num="001" />
              </div>
              <h1 className="text-2xl font-semibold">Customer</h1>
              <section className=" grid-3-cols-center-v gap-10 ">
                {Object.keys(customerInfo).map((key, index) => (
                  <Input
                    key={key}
                    name={key}
                    value={customerInfo[key]}
                    handleChange={handleChangeCustomerInfo}
                    label={
                      key === "VAT_NO" && option === "Simple User"
                        ? `${labels[index]}\u00A0(ID NO)` // Using Unicode for non-breaking space
                        : labels[index]
                    }
                    width="w-full"
                  />
                ))}
                <div className="col-start-1 col-span-full place-self-center">
                  {" "}
                  <button className="btn py-2 px-4 w-64" type="button">
                    Create Customer
                  </button>
                </div>
              </section>
            </form>
          </section>
          <section className="box-section">
            <div>
              <Table data={data} setData={setData} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Customer;
