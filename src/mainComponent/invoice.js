import { FunctionComponent } from "react";
import { useDispatch } from "../hooks/index";
import { useSelector } from "../hooks";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
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
  CreateCustomer,
  CreateItem,
} from "../ui/subComponent/general/index.js";
import "../CSS/general.css";
const Invoice = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // here two useeffect one to get all customers and other to get all deliveries
  // const deliveries = [
  //   { label: "delivery 1", value: "0001" },
  //   { label: "delivery 2", value: "0002" },
  //   { label: "delivery 3", value: "0003" },
  //   { label: "delivery 4", value: "0004" },
  //   { label: "customer 5", value: "lara" },
  // ];

  const deliveries = [
    {
      id: 1,
      delivery_number: "0001",
      customer: {
        id: 1,
        name: "aseel",
        mobile_NO: "122323232",
        full_address: "sdfer",
        city: "efrr",
        VAT_NO: "3434",
        customer_number: 2,
      },
      items: [
        {
          delivery_item_id: 9,
          item: {
            id: 1,
            name: "item1",
            price: 12,
            currency: "NIS",
            item_number: 2,
          },
          itemPrice: 20,
          itemCurrency: "NIS",
          itemQuantity: 2,
          totalPriceItem: 40,
        },
        {
          delivery_item_id: 10,
          item: {
            id: 1,
            name: "item1",
            price: 12,
            currency: "NIS",
            item_number: 2,
          },
          itemPrice: 4,
          itemCurrency: "NIS",
          itemQuantity: 2,
          totalPriceItem: 8,
        },
      ],
    },
    {
      id: 2,
      delivery_number: "0002",
      customer: {
        id: 2,
        name: "alaa",
        mobile_NO: "333333333",
        full_address: "dsf",
        city: "frrr",
        VAT_NO: "122122",
        customer_number: 3,
      },
      items: [
        {
          delivery_item_id: 11,
          item: {
            id: 2,
            name: "item2",
            price: 10,
            currency: "USD",
            item_number: 3,
          },
          itemPrice: 10,
          itemCurrency: "ERO",
          itemQuantity: 2,
          totalPriceItem: 20,
        },
      ],
    },
    {
      id: 3,
      delivery_number: "0003",
      customer: {
        id: 3,
        name: "fadi",
        mobile_NO: "444444444",
        full_address: "dfe",
        city: "cvdf",
        VAT_NO: "4444",
        customer_number: 4,
      },
      items: [
        {
          delivery_item_id: 12,
          item: {
            id: 3,
            name: "item3",
            price: 10,
            currency: "ERO",
            item_number: 4,
          },
          itemPrice: 5,
          itemCurrency: "NIS",
          itemQuantity: 2,
          totalPriceItem: 10,
        },
      ],
    },
    {
      id: 4,
      delivery_number: "0004",
      customer: {
        id: 4,
        name: "sara",
        mobile_NO: "555555555",
        full_address: "gerg",
        city: "ccc",
        VAT_NO: "4343",
        customer_number: 5,
      },
      items: [
        {
          delivery_item_id: 13,
          item: {
            id: 4,
            name: "item4",
            price: 10,
            currency: "NIS",
            item_number: 5,
          },
          itemPrice: 30,
          itemCurrency: "NIS",
          itemQuantity: 1,
          totalPriceItem: 30,
        },
      ],
    },
    {
      id: 5,
      delivery_number: "0005",
      customer: {
        id: 5,
        name: "lara",
        mobile_NO: "666666666",
        full_address: "rfgg",
        city: "sss",
        VAT_NO: "6666",
        customer_number: 6,
      },
      items: [
        {
          delivery_item_id: 14,
          item: {
            id: 5,
            name: "item5",
            price: 10,
            currency: "USD",
            item_number: 6,
          },
          itemPrice: 6,
          itemCurrency: "NIS",
          itemQuantity: 2,
          totalPriceItem: 12,
        },
      ],
    },
  ];

  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  console.log(`selected delivery items:${selectedDeliveries}`);
  // const [customers, setCustomers] = useState([
  //   { label: "", value: "Select a customer" },
  //   { label: "customer 1", value: "aseel" },
  //   { label: "customer 2", value: "alaa" },
  //   { label: "customer 3", value: "fadi" },
  //   { label: "customer 4", value: "sara" },
  //   { label: "customer 5", value: "lara" },
  // ]);
  const [customers, setCustomers] = useState([
    {
      id: null,
      name: "Select a customer",
      mobile_NO: "",
      full_address: "",
      city: "",
      VAT_NO: "",
      customer_number: null,
    },
    {
      id: 1,
      name: "aseel",
      mobile_NO: "122323232",
      full_address: "sdfer",
      city: "efrr",
      VAT_NO: "3434",
      customer_number: 2,
    },
    {
      id: 2,
      name: "alaa",
      mobile_NO: "333333333",
      full_address: "dsf",
      city: "frrr",
      VAT_NO: "122122",
      customer_number: 3,
    },
    {
      id: 3,
      name: "fadi",
      mobile_NO: "444444444",
      full_address: "dfe",
      city: "cvdf",
      VAT_NO: "4444",
      customer_number: 4,
    },
    {
      id: 4,
      name: "sara",
      mobile_NO: "555555555",
      full_address: "gerg",
      city: "ccc",
      VAT_NO: "4343",
      customer_number: 5,
    },
    {
      id: 5,
      name: "lara",
      mobile_NO: "666666666",
      full_address: "rfgg",
      city: "sss",
      VAT_NO: "6666",
      customer_number: 6,
    },
  ]);

  const [customer, setCustomer] = useState(customers[0]);

  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false); // Toggle modal visibility
  const [newCustomer, setNewCustomer] = useState(""); // Store new customer name

  const handleChangeCustomer = (e) => {
    if (e.target.value === "create_new") {
      setIsCreatingCustomer(true); // Show popup to create a new customer
      return;
    }
    console.log(`print id of customer from database ${e.target.value}`);
    const selectedOption = customers.find((item) => item.id == e.target.value);
    setCustomer(selectedOption || customers[0]);
  };
  console.log(`here after change on customer ${customer.name}`);

  //here api to get all items
  const [items, setItems] = useState([
    {
      id: null,
      name: "Select an item",
      price: null,
      currency: "NIS",
      item_number: null,
    },
    {
      id: 1,
      name: "item1",
      price: 12,
      currency: "NIS",
      item_number: 2,
    },
    {
      id: 2,
      name: "item2",
      price: 10,
      currency: "USD",
      item_number: 3,
    },
    {
      id: 3,
      name: "item3",
      price: 10,
      currency: "ERO",
      item_number: 4,
    },
    {
      id: 4,
      name: "item4",
      price: 10,
      currency: "NIS",
      item_number: 5,
    },
    {
      id: 5,
      name: "item5",
      price: 10,
      currency: "USD",
      item_number: 6,
    },
  ]);

  // const [item, setItem] = useState(items[0]);

  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  // const [newItem, setNewItem] = useState(""); // Store new customer name

  let itemsCurrency = ["NIS", "USD", "ERO"];

  //here for invoice items
  const [invoiceItems, setInvoiceItems] = useState([
    // {
    //   item: items[0],
    //   itemPrice: null,
    //   itemCurrency: itemsCurrency[0],
    //   itemQuantity: null,
    //   totalPriceItem: null,
    // },
  ]);

  const [anotherItem, setAnotherItem] = useState({ exist: false, name: "" });
  const handleChangeItem = (e, invoiceItemIndex) => {
    if (e.target.value === "create_new") {
      setIsCreatingItem(true);
      setSelectedItemIndex(invoiceItemIndex);
      return;
    }
    if (e.target.value === "another") {
      setAnotherItem({ ...anotherItem, exist: true });
      return;
    }

    console.log(`print id of item from database ${e.target.value}`);

    // Find the selected item from the list
    const selectedOption =
      items.find((item) => item.id == e.target.value) || items[0];

    // Update the invoiceItems array correctly
    setInvoiceItems((prevInvoiceItems) =>
      prevInvoiceItems.map((item, index) =>
        index === invoiceItemIndex
          ? {
              ...item,
              item: selectedOption,
              itemPrice: selectedOption.price,
              itemCurrency: selectedOption.currency,
              totalPriceItem: selectedOption.price * (item.itemQuantity || 0), // Use selectedOption.price
            }
          : item
      )
    );
  };

  const handleChangeAnotherItem = (e, invoiceItemIndex) => {
    setInvoiceItems((prevInvoiceItems) =>
      prevInvoiceItems.map((item, index) =>
        index === invoiceItemIndex
          ? {
              ...item,
              item: {
                id: null,
                name: anotherItem.value,
                price: null,
                currency: "USD",
                item_number: null,
              },
            }
          : item
      )
    );
  };

  console.table(invoiceItems);

  const handleChangeItemPrice = (e, invoiceItemIndex) => {
    setInvoiceItems((prevInvoiceItems) =>
      prevInvoiceItems.map((item, index) =>
        index === invoiceItemIndex
          ? {
              ...item,
              itemPrice: e.target.value,
              totalPriceItem: e.target.value * (item.itemQuantity || 0),
            }
          : item
      )
    );
  };

  const handleChangeItemCurrency = (e, invoiceItemIndex) => {
    setInvoiceItems((prevInvoiceItems) =>
      prevInvoiceItems.map((item, index) =>
        index === invoiceItemIndex
          ? { ...item, itemCurrency: e.target.value }
          : item
      )
    );
  };

  // const [itemQuantity, setItemQuantity] = useState();

  const handleChangeItemQuantity = (e, invoiceItemIndex) => {
    setInvoiceItems((prevInvoiceItems) =>
      prevInvoiceItems.map((item, index) =>
        index === invoiceItemIndex
          ? {
              ...item,
              itemQuantity: e.target.value,
              totalPriceItem: e.target.value * (item.itemPrice || 0),
            }
          : item
      )
    );
  };

  let addItem = () => {
    setInvoiceItems((prevItems) => [
      ...prevItems,
      {
        item: items[0],
        itemPrice: null,
        itemCurrency: itemsCurrency[0],
        itemQuantity: null,
        totalPriceItem: null,
      },
    ]);
  };

  const deleteItem = (invoiceItemIndex) => {
    setInvoiceItems((prevInvoiceItems) =>
      prevInvoiceItems.filter((_, index) => index !== invoiceItemIndex)
    );
  };

  const totalPrice = useMemo(() => {
    return invoiceItems.reduce(
      (sum, item) => sum + (item.totalPriceItem || 0),
      0
    );
  }, [invoiceItems]);

  // //here will create state invoiceItems [{item_number:,name:,itemPrice:,currency:itemQuantity:,totalPriceItem},{}]
  // //useeffect based on invoiceItems if any change increase or change enter it do map on all invoiceItems and calculate totalPriceItem every item and sum totalPriceItem to set totapPrice
  // const [totalPriceItem, setTotalPriceItem] = useState();

  // useEffect(() => {
  //   setInvoiceItems((prevInvoiceItems) =>
  //     prevInvoiceItems.map((invoiceItem) => {
  //       if (
  //         invoiceItem.item &&
  //         invoiceItem.item.itemPrice &&
  //         invoiceItem.item.itemQuantity
  //       ) {
  //         return {
  //           ...invoiceItem,
  //           totalPriceItem:
  //             invoiceItem.item.itemPrice * invoiceItem.item.itemQuantity,
  //         };
  //       }
  //       return invoiceItem;
  //     })
  //   );
  // }, [invoiceItems]);

  //alternative of this function I will validation and send API and when return success I will setIsCreatingCustomer false and will automatically clear the data
  //because I pass isCreatingCustomer based on it when false clear the data
  const handleCreateCustomer = () => {
    if (!newCustomer.trim()) return;
    setNewCustomer("");
    //I will use the same here
    const newEntry = { id: newCustomer, name: newCustomer.toLowerCase() };
    setCustomers([...customers, newEntry]);
    setCustomer(newEntry);
    setIsCreatingCustomer(false);
  };

  const [customerInfo, setCustomerInfo] = useState({
    Mobile_NO: "",
    Full_Address: "",
    City: "",
    VAT_NO: "",
  });

  const handleChangeCustomerInfo = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let labels = ["Mobile NO", "Full Address", "City", "VAT NO"];
  console.log(
    `customer Information ${customerInfo.Mobile_NO} ${customerInfo.Full_Address} ${customerInfo.City}`
  );
  // useEffect depending on the `customer` state
  useEffect(() => {
    console.log(`here run first time and when customer change`);
    if (customer.id) {
      console.log(
        `here run first time and when customer change:${customer.id}`
      );
      setCustomerInfo((prev) => ({
        Mobile_NO: customer.mobile_NO,
        Full_Address: customer.full_address,
        City: customer.city,
        VAT_NO: customer.VAT_NO,
      }));
    } else {
      setCustomerInfo((prev) => ({
        Mobile_NO: "",
        Full_Address: "",
        City: "",
        VAT_NO: "",
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
          item.id ===
          selectedDeliveries[selectedDeliveries.length - 1].customer.id
      );

      if (selectedOption) {
        setCustomer({
          ...selectedDeliveries[selectedDeliveries.length - 1].customer,
        });
      } else {
        setCustomer({
          ...(customers.find((item) => item.id === null) || customers[0]),
        });
      }
    } else {
      setCustomer({
        ...(customers.find((item) => item.id === null) || customers[0]),
      });
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
  const [currencyTypeOption, setCurrencyTypeOption] = useState(currencyType[0]);

  const handleChangeCurrencyTypeOption = (e) =>
    setCurrencyTypeOption(e.target.value);
  console.log(`currency type that selected : ${currencyTypeOption}`);

  // here query to get invoice number in useeffect
  function convertNumberToWords(number) {
    const [integerPart, decimalPart] = number.toString().split(".");

    // Convert integer and decimal parts to words
    const integerInWords = toWords(parseInt(integerPart, 10));
    const decimalInWords = decimalPart
      ? toWords(parseInt(decimalPart, 10))
      : "";

    // Handle cases where there's no decimal part
    return decimalPart
      ? `${integerInWords} point ${decimalInWords}`
      : integerInWords;
  }

  const [totalPriceWithoutVAT, setTotalPriceWithoutVAT] = useState();
  console.log(`total price without VAT : ${totalPriceWithoutVAT}`);

  const [isIncludeVAT, setIsIncludeVAT] = useState(false);

  const handleIsIncludeVATChange = () => {
    setIsIncludeVAT(!isIncludeVAT);
  };
  console.log(`include vat : ${isIncludeVAT}`);

  const [isIncludeItemVAT, setIsIncludeItemVAT] = useState(false);

  const handleIsIncludeItemVATChange = () => {
    setIsIncludeItemVAT(!isIncludeItemVAT);
  };
  console.log(`include item vat : ${isIncludeItemVAT}`);
  //here adding useeffect based on isIncludeVAT or isIncludeItemVAT codition inside useeffect isIncludeVAT when true  get vat from DB ans setState on VAT

  const [VAT, setVAT] = useState(".17");
  console.log(`VAT : ${VAT}`);

  const [totalVAT, setTotalVAT] = useState(null);
  console.log(`totalVAT is : ${totalVAT}`);

  const [totalPriceWithVAT, setTotalPriceWithVAT] = useState();
  console.log(`total Price With VAT : ${totalPriceWithVAT}`);

  const [totalPriceInWords, setTotalPriceInWords] = useState("");
  console.log(`total Price inwords : ${totalPriceInWords}`);

  useEffect(() => {
    if (totalPrice) {
      let calculatedTotalPriceWithoutVAT;
      let calculatedTotalVAT;
      let calculatedTotalPriceWithVAT;
      let calculatedTotalPriceInWords;

      if (isIncludeVAT) {
        calculatedTotalPriceWithoutVAT = totalPrice;
        calculatedTotalVAT = totalPrice * VAT;
        calculatedTotalPriceWithVAT =
          calculatedTotalPriceWithoutVAT + calculatedTotalVAT;
        calculatedTotalPriceInWords = calculatedTotalPriceWithVAT;
      } else if (isIncludeItemVAT) {
        calculatedTotalPriceWithoutVAT = totalPrice / 1.17;
        calculatedTotalVAT = calculatedTotalPriceWithoutVAT - totalPrice;
        calculatedTotalPriceWithVAT = totalPrice;
        calculatedTotalPriceInWords = calculatedTotalPriceWithVAT;
      } else {
        calculatedTotalPriceWithoutVAT = totalPrice;
        calculatedTotalVAT = null;
        calculatedTotalPriceWithVAT = null;
        calculatedTotalPriceInWords = calculatedTotalPriceWithoutVAT;
      }

      // Now update state in one go
      setTotalPriceWithoutVAT(
        calculatedTotalPriceWithoutVAT?.toString().includes(".")
          ? Number(
              calculatedTotalPriceWithoutVAT?.toString().split(".")[0] +
                "." +
                calculatedTotalPriceWithoutVAT?.toString().split(".")[1][0]
            )
          : calculatedTotalPriceWithoutVAT
      );
      setTotalVAT(
        calculatedTotalVAT?.toString().includes(".")
          ? Number(
              calculatedTotalVAT?.toString().split(".")[0] +
                "." +
                calculatedTotalVAT?.toString().split(".")[1][0]
            )
          : calculatedTotalVAT
      );
      setTotalPriceWithVAT(
        calculatedTotalPriceWithVAT?.toString().includes(".")
          ? Number(
              calculatedTotalPriceWithVAT?.toString().split(".")[0] +
                "." +
                calculatedTotalPriceWithVAT?.toString().split(".")[1][0]
            )
          : calculatedTotalPriceWithVAT
      );
      setTotalPriceInWords(convertNumberToWords(calculatedTotalPriceInWords));
    } else {
      setTotalPriceWithoutVAT(null);
      setTotalVAT(null);
      setTotalPriceWithVAT(null);
      setTotalPriceInWords("");
    }
  }, [totalPrice, isIncludeVAT, isIncludeItemVAT, VAT]); // Ensure all dependencies are included

  const [signatureInvoice, setSignatureInvoice] = useState({
    urlSign: null,
    urlFile: null,
  }); // here save the signature value just when not null if null does not save
  console.log(`test invoice urlSign ${signatureInvoice.urlSign}`);
  console.log(`test invoice urlFile ${signatureInvoice.urlFile}`);

  //adding useeffect based on isCreatingCustomer when true api to get last Customer_number and increment it by one
  //adding useeffect to get invoice_number and increment it by one
  useEffect(() => {
    setInvoiceItems((prevInvoiceItems) => {
      if (selectedDeliveries.length === 0) {
        // If no deliveries are selected, reset to default item
        return [
          {
            item: items[0], // Default first item
            itemPrice: null,
            itemCurrency: itemsCurrency[0], // Default currency
            itemQuantity: null,
            totalPriceItem: null,
          },
        ];
      }

      // Remove the default item if it's present
      let filteredInvoiceItems = prevInvoiceItems.filter(
        (item) => item.item.id !== items[0].id // Remove default item if it exists
      );

      // Get a list of delivery IDs that are still selected
      const selectedDeliveryIds = selectedDeliveries.map(
        (delivery) => delivery.id
      );
      console.log("sdsddfggggggggggggggggggggggggggggggggggggg");
      console.log(selectedDeliveryIds);

      // Remove items belonging to unselected deliveries
      filteredInvoiceItems = filteredInvoiceItems.filter((item) =>
        selectedDeliveryIds.includes(item.delivery_item_id)
      );

      // Extract all items from newly selected deliveries
      const newItems = selectedDeliveries.flatMap((delivery) =>
        delivery.items.map((item) => ({
          delivery_item_id: item.delivery_item_id,
          item: item.item,
          itemPrice: item.itemPrice,
          itemCurrency: item.itemCurrency,
          itemQuantity: item.itemQuantity,
          totalPriceItem: item.totalPriceItem,
        }))
      );

      // Combine new items with existing ones, avoiding duplicates
      const mergedInvoiceItems = [...filteredInvoiceItems];

      newItems.forEach((newItem) => {
        const exists = mergedInvoiceItems.some(
          (existingItem) =>
            existingItem.delivery_item_id === newItem.delivery_item_id
        );
        if (!exists) {
          mergedInvoiceItems.push(newItem);
        }
      });

      return mergedInvoiceItems;
    });
  }, [selectedDeliveries]);

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
          <NumberValue label="Customer" num={customer.customer_number} />
        </div>
        <div className="border py-8 grid-4-cols-center-vx gap-y-10">
          <CreatableDropDown
            options={customers}
            option={customer}
            handleChangeOption={handleChangeCustomer}
            valueKey="id"
            label="name"
            // label={"select customer"}
            width="w-96"
          />
          {Object.keys(customerInfo).map((key, index) => {
            console.log("assssssssl");
            console.log(customerInfo);

            return (
              <Input
                key={key}
                name={key}
                value={customerInfo[key] || ""} // Ensure value is never null
                handleChange={handleChangeCustomerInfo}
                label={labels[index]}
                // width="w-80"
              />
            );
          })}
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

      <section className="border rounded-[20px] p-10">
        <div className=" border flex-center-v-space-between">
          <h1 className="text-2xl font-semibold">Item</h1>
          <button
            className="btn py-2 px-4 w-64"
            type="button"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>
        <div className="border grid gap-y-10">
          {invoiceItems.map((invoiceItem, index) => {
            return (
              <div
                key={index}
                className="border grid-7-cols-center-vx gap-y-10"
              >
                <NumberValue
                  label="Item"
                  num={invoiceItem.item.item_number}
                  width="w-40"
                />
                <CreatableDropDown
                  options={items}
                  option={invoiceItem.item}
                  handleChangeOption={(e) => handleChangeItem(e, index)} // Fix this line
                  valueKey="id"
                  label="name"
                  width="w-48"
                  item={"anotherItem"}
                />
                {anotherItem.exist ? (
                  <Input
                    key={"another_item"}
                    name={"another_item"}
                    value={anotherItem.value || ""} // Ensure value is never null
                    handleChange={(e) => handleChangeAnotherItem(e, index)}
                    label={"Another item"}
                    // width="w-80"
                  />
                ) : null}
                <Input
                  key={"item_price"}
                  name={"Price"}
                  value={invoiceItem.itemPrice || ""} // Ensure value is never null
                  handleChange={(e) => handleChangeItemPrice(e, index)}
                  label={"Item price"}
                  width="w-40"
                />
                <DropDown
                  options={itemsCurrency}
                  option={invoiceItem.itemCurrency}
                  handleChangeOption={(e) => handleChangeItemCurrency(e, index)}
                  label={"Select item currency "}
                  width="w-40"
                />
                <Input
                  key={"item_quantity"}
                  name={"quantity"}
                  value={invoiceItem.itemQuantity || ""}
                  handleChange={(e) => handleChangeItemQuantity(e, index)}
                  label={"Item quantity"}
                  width="w-40"
                />
                <Input
                  key={"total_price_item"}
                  name={"Price"}
                  value={invoiceItem.totalPriceItem || ""}
                  label={"Total price item"}
                  width="w-40"
                  readOnly={true}
                />

                <button
                  className="btn-delete py-2 px-4 w-64"
                  type="button"
                  onClick={() => deleteItem(index)}
                >
                  Delete Item
                </button>
              </div>
            );
          })}
        </div>
        <div className=" border flex-center-v-end-x gap-10">
          <Input
            key={"total_price"}
            name={"Price"}
            value={totalPrice || ""}
            label={"Total price "}
            width="w-40"
            readOnly={true}
          />
          <CheckBox
            isChecked={isIncludeItemVAT}
            handleChange={handleIsIncludeItemVATChange}
            label="Include Item VAT"
            style={isIncludeVAT}
          />
        </div>
      </section>

      <section className="border rounded-[20px] p-10 grid gap-10 ">
        <h1 className="text-2xl font-semibold">Invoice Summary</h1>
        <div className="flex gap-10">
          <Input
            key={"Total_Price_without_VAT"}
            name={"Price"}
            value={totalPriceWithoutVAT || ""}
            label={"Total Price Without VAT"}
            readOnly={true}
          />
          <CheckBox
            isChecked={isIncludeVAT}
            handleChange={handleIsIncludeVATChange}
            label="Include VAT"
            style={isIncludeItemVAT}
          />
        </div>
        {isIncludeVAT || isIncludeItemVAT ? (
          <div className="flex gap-10">
            <Input
              key={"VAT"}
              name={"Price"}
              value={VAT}
              label={"VAT"}
              readOnly={true}
            />

            <Input
              key={"Total_VAT"}
              name={"Price"}
              value={totalVAT || ""}
              label={"Total VAT"}
              readOnly={true}
            />
            <Input
              key={"Total_Price_With_VAT"}
              name={"Price"}
              value={totalPriceWithVAT || ""}
              label={"Total Price With VAT"}
              readOnly={true}
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
            label={"Total Price In Words"}
            readOnly={true}
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
      {isCreatingCustomer && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
          <div className=" bg-white rounded-lg shadow-lg p-6 border w-full max-w-[60rem]">
            <div className="flex-center-v-space-between mb-[1.6rem]">
              <h1 className="text-3xl font-bold ">Create Customer</h1>
              <button
                onClick={() => {
                  setCustomer({
                    ...(customers.find((item) => item.id === null) ||
                      customers[0]),
                  });
                  setIsCreatingCustomer(false);
                }}
                className="text-3xl font-bold text-gray-600 hover:text-red-600"
              >
                &times;
              </button>
            </div>

            <CreateCustomer />
          </div>
        </div>
      )}

      {isCreatingItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
          <div className=" bg-white rounded-lg shadow-lg py-10 px-6 border w-full max-w-[60rem]">
            <div className="flex-center-v-space-between mb-[1.6rem]">
              <h1 className="text-3xl font-bold ">Create Item</h1>

              <button
                onClick={() => {
                  if (selectedItemIndex !== null) {
                    setInvoiceItems((prevInvoiceItems) => {
                      // Create a completely new array to trigger re-render
                      const updatedInvoiceItems = prevInvoiceItems.map(
                        (item, index) =>
                          index === selectedItemIndex
                            ? {
                                ...item,
                                item: {
                                  ...(items.find((item) => item.id === null) ||
                                    items[0]),
                                }, // Create a new object reference

                                itemPrice: (
                                  items.find((item) => item.id === null) ||
                                  items[0]
                                ).price,
                                itemCurrency: (
                                  items.find((item) => item.id === null) ||
                                  items[0]
                                ).currency,
                                totalPriceItem:
                                  ((
                                    items.find((item) => item.id === null) ||
                                    items[0]
                                  ).price || 0) * (item.itemQuantity || 0), // Use selectedOption.price
                              }
                            : item
                      );
                      return [...updatedInvoiceItems]; // Ensures React detects the change
                    });
                  }
                  setIsCreatingItem(false);
                  setSelectedItemIndex(null);
                }}
                className="text-3xl font-bold text-gray-600 hover:text-red-600"
              >
                &times;
              </button>
            </div>

            <CreateItem />
          </div>
        </div>
      )}
    </main>
  );
};

export default Invoice;
