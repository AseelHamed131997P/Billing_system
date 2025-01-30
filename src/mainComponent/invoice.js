import { FunctionComponent } from "react";
import { useDispatch } from "../hooks/index";
import { useSelector } from "../hooks";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "../index.css";
import {
  InvoiceLangSelect,
  MultiSelectInput,
  NumberValue,
  Input,
  CreatableDropDown,
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
  //   { label: "", value: "Select a customer" },
  //   { label: "customer 1", value: "aseel" },
  //   { label: "customer 2", value: "alaa" },
  //   { label: "customer 3", value: "fadi" },
  //   { label: "customer 4", value: "sara" },
  //   { label: "customer 5", value: "lara" },
  // ]);

  const [customer, setCustomer] = useState(customers[0]);
  const [isCreating, setIsCreating] = useState(false); // Toggle modal visibility
  const [newCustomer, setNewCustomer] = useState(""); // Store new customer name

  const handleChangeCustomer = (e) => {
    if (e.target.value === "create_new") {
      setIsCreating(true); // Show popup to create a new customer
      return;
    }

    const selectedOption = customers.find(
      (item) => item.value === e.target.value
    );
    setCustomer(selectedOption || customers[0]);
  };

  const handleCreateCustomer = () => {
    if (!newCustomer.trim()) return; // Prevent empty names

    const newEntry = { label: newCustomer, value: newCustomer.toLowerCase() };
    setCustomers([...customers, newEntry]);
    setCustomer(newEntry);
    setNewCustomer("");
    setIsCreating(false);
  };

  console.log(customer);

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
