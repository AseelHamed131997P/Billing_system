import { FunctionComponent } from "react";
import { useDispatch } from "../hooks/index";
import { useSelector } from "../hooks";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toWords } from "number-to-words";

import "../index.css";
import {
  InvoiceLangSelect,
  MultiSelectInput,
  NumberValue,
  Input,
  CreatableDropDown,
  DropDown,
  CheckBox,
  Signature,
  FileInput,
} from "../ui/subComponent/general/index.js";
import "../CSS/general.css";
const Invoice = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const deliveries = [
    { label: "delivery 1", value: "0001" },
    { label: "delivery 2", value: "0002" },
    { label: "delivery 3", value: "0003" },
    { label: "delivery 4", value: "0004" },
    { label: "customer 5", value: "lara" },
  ];
  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  console.log(`selected delivery items:${selectedDeliveries}`);
  const [customers, setCustomers] = useState([
    { label: "", value: "Select a customer" },
    { label: "customer 1", value: "aseel" },
    { label: "customer 2", value: "alaa" },
    { label: "customer 3", value: "fadi" },
    { label: "customer 4", value: "sara" },
    { label: "customer 5", value: "lara" },
  ]);
  // const [customers, setCustomers] = useState([
  //   { id : "", name: "Select a customer", mobile_NO:'', full_address:'sfr', city:'wew',VAT_NO:'1234' },
  //   {  id : "", name: "aseel", mobile_NO:'122323232', full_address:'sdfer', city:'efrr',VAT_NO:'3434'},
  //   {  id : "1", name: "alaa", mobile_NO:'333333333', full_address:'dsf', city:'frrr',VAT_NO:'122122' },
  //   {  id : "2", name: "fadi", mobile_NO:'444444444', full_address:'dfe', city:'cvdf',VAT_NO:'4444'},
  //   {  id : "3", name: "sara", mobile_NO:'555555555', full_address:'gerg', city:'ccc',VAT_NO:'4343' },
  //   { id : "4", name: "lara", mobile_NO:'666666666', full_address:'rfgg', city:'sss',VAT_NO:'6666' },
  // ]);

  const [customer, setCustomer] = useState(customers[0]);
  const [isCreating, setIsCreating] = useState(false); // Toggle modal visibility
  const [newCustomer, setNewCustomer] = useState(""); // Store new customer name

  const handleChangeCustomer = (e) => {
    if (e.target.value === "create_new") {
      setIsCreating(true); // Show popup to create a new customer
      return;
    }
    console.log(`ddddddddddddddddddd ${e.target.value}`);
    const selectedOption = customers.find(
      (item) => item.value === e.target.value
    );
    setCustomer(selectedOption || customers[0]);
  };
  console.log(customer);

  const handleCreateCustomer = () => {
    if (!newCustomer.trim()) return; // Prevent empty names

    const newEntry = { label: newCustomer, value: newCustomer.toLowerCase() };
    setCustomers([...customers, newEntry]);
    setCustomer(newEntry);
    setNewCustomer("");
    setIsCreating(false);
  };

  const [customerInfo, setCustomerInfo] = useState({
    Mobile_NO: null,
    Full_Address: null,
    City: null,
  });

  const handleChangeCustomerInfo = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  let labels = ["Mobile NO", "Full Address", "City"];
  console.log(
    `customer Information ${customerInfo.Mobile_NO} ${customerInfo.Mobile_NO} ${customerInfo.Mobile_NO}`
  );
  // useEffect depending on the `customer` state
  useEffect(() => {
    console.log(`here run first time and when customer change`);
    if (customer) {
      setCustomerInfo((prev) => ({
        Mobile_NO: customer.label,
        Full_Address: customer.label,
        City: customer.label,
      }));
    }
  }, [customer]); // Dependency array: useEffect runs when `customer` changes

  // useEffect depending on the `customer` state
  useEffect(() => {
    console.log(`here run first time and when deliveries change`);
    if (selectedDeliveries.length > 0) {
      // Find the corresponding customer based on the last selected delivery
      //compare based on customer_id
      const selectedOption = customers.find(
        (item) =>
          item.label ===
            selectedDeliveries[selectedDeliveries.length - 1].label &&
          item.value === selectedDeliveries[selectedDeliveries.length - 1].value
      );

      if (selectedOption) {
        setCustomer({
          label: selectedDeliveries[selectedDeliveries.length - 1].label,
          value: selectedDeliveries[selectedDeliveries.length - 1].value,
        });
      }
    } else {
      setCustomer(customers[0]);
    }
  }, [selectedDeliveries]); // Dependency array: useEffect runs when `selectedDeliveries` changes

  let invoiceType = [
    "Simple User",
    "Commerical With VAT NO",
    "Commerical with Free VAT NO",
    "Company Non Profit",
  ];
  const [invoiceTypeOption, setInvoiceTypeOption] = useState(invoiceType[0]);

  const handleChangeInvoiceTypeOption = (e) =>
    setInvoiceTypeOption(e.target.value);
  console.log(`invoice type that selected : ${invoiceTypeOption}`);

  let currencyType = ["NIS", "USD", "ERO"];
  const [currencyTypeOption, setCurrencyTypeOption] = useState(invoiceType[0]);

  const handleChangeCurrencyTypeOption = (e) =>
    setCurrencyTypeOption(e.target.value);
  console.log(`currency type that selected : ${currencyTypeOption}`);

  // here query to get invoice number in useeffect

  const [totalPrice, setTotalPrice] = useState("2355.3");
  console.log(`total price : ${totalPrice}`);

  const [isIncludeVAT, setIsIncludeVAT] = useState(false);

  const handleIsIncludeVATChange = () => {
    setIsIncludeVAT(!isIncludeVAT);
  };
  console.log(`include vat : ${isIncludeVAT}`);
  //here adding useeffect based on isIncludeVAT codition inside useeffect isIncludeVAT when true  get vat from DB ans setState on VAT

  const [VAT, setVAT] = useState(".17");
  console.log(`VAT : ${VAT}`);

  const [totalPriceWithVAT, setTotalPriceWithVAT] = useState("20.1");
  console.log(`total Price With VAT : ${totalPriceWithVAT}`);

  function convertNumberToWords(number) {
    const [integerPart, decimalPart] = totalPriceWithVAT.split(".");

    const integerInWords = toWords(parseInt(integerPart));

    const decimalInWords = decimalPart ? toWords(parseInt(decimalPart)) : "";

    return `${integerInWords} point ${decimalInWords}`;
  }
  //here will condition on isIncludeVAT if true pass totalPriceWithVAT else pass totalPrice
  const [totalPriceInWords, setTotalPriceInWords] = useState(
    convertNumberToWords(totalPriceWithVAT)
  );
  console.log(`total Price inwords : ${totalPriceInWords}`);
  const [signatureInvoice, setSignatureInvoice] = useState({
    urlSign: null,
    urlFile: null,
  }); // here save the signature value just when not null if null does not save
  console.log(`test  invoice urlSign ${signatureInvoice.urlSign}`);
  console.log(`test invoice urlFile ${signatureInvoice.urlFile}`);
  return (
    <main className="p-10 border grid gap-10">
      <section className="border rounded-[20px] p-10 flex-center-v-space-between">
        <div className=" border   center-v  w-full max-w-[40rem] ">
          <label className="text-xl">Delivery Numbers: &nbsp; </label>
          <MultiSelectInput
            options={deliveries}
            selectedOptions={selectedDeliveries} // Pass the full selected object ✅ Correct
            setSelectedOptions={setSelectedDeliveries}
            placeholder="Select Your Delivery Number"
          />
        </div>
        <div className=" border w-80 ">
          <InvoiceLangSelect />
        </div>
      </section>
      <section className="border rounded-[20px] p-10">
        <div className=" border flex-center-v-space-between">
          <h1 className="text-2xl font-semibold">Customer</h1>
          <NumberValue label="Customer" num="00001" />
          {/* <div>dsfs</div> */}
        </div>
        <div className="border py-8 grid-4-cols-center-vx gap-y-10">
          <CreatableDropDown
            options={customers}
            option={customer}
            handleChangeOption={handleChangeCustomer}
            valueKey="value"
            // label={"select customer"}
            width="w-96"
          />
          {Object.keys(customerInfo).map((key, index) => (
            <Input
              key={key}
              name={key}
              value={customerInfo[key]}
              handleChange={handleChangeCustomerInfo}
              label={labels[index]}
              // width="w-80"
            />
          ))}
        </div>
      </section>
      <section className="border rounded-[20px] p-10 grid gap-10 ">
        <div className="flex-center-v-space-between ">
          {" "}
          <h1 className=" flex-grow text-center font-medium text-2xl">
            Invoice 0001
          </h1>
          <div className="text-xl">
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
        </div>
        <div className=" border mx-auto grid-2-cols-center-vx max-w-[100rem]">
          <DropDown
            options={invoiceType}
            option={invoiceTypeOption}
            handleChangeOption={handleChangeInvoiceTypeOption}
            label={"select invoice type"}
            width="w-96"
          />
          <DropDown
            options={currencyType}
            option={currencyTypeOption}
            handleChangeOption={handleChangeCurrencyTypeOption}
            label={"select currency type"}
            width="w-96"
          />
        </div>
      </section>
      <section className="border rounded-[20px] p-10 grid gap-10 ">
        <h1 className="text-2xl font-semibold">Invoice Summary</h1>
        <div className="flex gap-10">
          <Input
            key={"Total_Price"}
            name={"Total_Price"}
            value={totalPrice}
            // handleChange={handleChangeCustomerInfo}
            label={"Total Price"}
            // width="w-80"
          />
          <CheckBox
            isChecked={isIncludeVAT}
            handleChange={handleIsIncludeVATChange}
            label="Include VAT"
          />
        </div>
        {isIncludeVAT ? (
          <div className="flex gap-10">
            <Input
              key={"VAT"}
              name={"VAT"}
              value={VAT}
              // handleChange={handleChangeCustomerInfo}
              label={"VAT"}
              // width="w-80"
            />
            <Input
              key={"Total_Price_VAT"}
              name={"Total_Price_VAT"}
              value={totalPriceWithVAT}
              // handleChange={handleChangeCustomerInfo}
              label={"Total Price With VAT"}
              // width="w-80"
            />
          </div>
        ) : (
          ""
        )}
        <div>
          {" "}
          <Input
            key={"total_Price_IN_Words"}
            name={"total_Price_IN_Words"}
            value={totalPriceInWords}
            // handleChange={handleChangeCustomerInfo}
            label={"Total Price In Words"}
            // width="w-80"
          />
        </div>
        <div>
          <div className="grid-2-cols-center-vx">
            <div className="w-50rem ">
              <p className="text-lg	font-medium	 center-x">
                Enter Your Signature
              </p>
              <Signature
                setSignature={setSignatureInvoice}
                signature={signatureInvoice}
              />
            </div>

            <div className="border">
              {signatureInvoice.urlSign || signatureInvoice.urlFile ? (
                <img
                  src={
                    signatureInvoice.urlSign && signatureInvoice.urlFile
                      ? signatureInvoice.urlFile // Show urlFile if both exist
                      : signatureInvoice.urlSign || signatureInvoice.urlFile // Show the existing URL
                  }
                  alt="Signature"
                  className="w-[18rem] h-[9rem]"
                />
              ) : (
                "Invoice Signature"
              )}
            </div>

            <div className=" w-full  flex-vx-center flex-col  ">
              <div className="  font-semibold text-xl tracking-[0.2rem]">
                OR{" "}
              </div>
              <FileInput
                setFile={setSignatureInvoice}
                file={signatureInvoice}
                name={"Choose Signature Image"}
              />
            </div>
          </div>
        </div>
      </section>
      {isCreating && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-3">Create New Customer</h2>
            <input
              type="text"
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
              placeholder="Enter customer name"
              className="border border-gray-300 rounded p-2 w-full"
            />
            <div className="flex justify-end space-x-3 mt-3">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCustomer}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Invoice;
