import { React, useState } from "react"; // React import for useState
import "../../../CSS/general.css";

import { Input, DropDown, NumberValue } from "./index.js";

const CreateCustomer = () => {
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

  return (
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
  );
};

export default CreateCustomer;
