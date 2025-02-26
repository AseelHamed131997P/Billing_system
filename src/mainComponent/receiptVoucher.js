import { FunctionComponent } from "react";
import { useDispatch } from "../hooks/index";
import { useSelector } from "../hooks";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import { toWords } from "number-to-words";
import AddIcon from "../svgs/addIcon.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";
import { Header } from "./index.js";
import { saveInHistory } from "../actions/invoice.js";
import Cookies from "js-cookie";

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
  HeaderReceiptVoucher,
} from "../ui/subComponent/general/index.js";
import "../CSS/general.css";
import DeleteIcon from "../svgs/deleteIcon.js";
import * as yup from "yup";
import { useFormik, ErrorMessage, Formik } from "formik";

import {
  Banknote,
  CreditCard,
  Wallet,
  Ban as Bank,
  AlertCircle,
  Calendar,
  DollarSign,
  Clock,
  Users,
  ChevronDown,
  Upload,
  Plus,
} from "lucide-react";

// Define the receipt types and their properties
const RECEIPT_TYPES = {
  cash: {
    icon: Banknote,
    label: "Cash",
    description: "Cash payment receipt",
  },
  cheque: {
    icon: CreditCard,
    label: "Cheque",
    description: "Cheque payment receipt",
  },
  "cash&cheque": {
    icon: Wallet,
    label: "Cash & Cheque",
    description: "Combined cash and cheque payment",
  },
  bankTransfer: {
    icon: Bank,
    label: "Bank Transfer",
    description: "Bank transfer receipt",
  },
  unpaid: {
    icon: AlertCircle,
    label: "Unpaid",
    description: "Unpaid receipt record",
  },
};

// Mock data - In a real app, this would come from an API
const receiptData = {
  cash: {
    total: 25,
    amount: 15000,
    lastReceipt: "2023-12-10T10:30:00",
  },
  cheque: {
    total: 40,
    amount: 25000,
    postdated: 5,
    returned: 2,
  },
  "cash&cheque": {
    total: 10,
    amount: 18000,
  },
  bankTransfer: {
    total: 15,
    amount: 30000,
    lastTransfer: "2023-12-10T09:00:00",
  },
  unpaid: {
    total: 8,
    amount: 12000,
    customers: 6,
  },
};

function SummaryCard({ title, icon: Icon, stats, className }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-50">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-3">{stats}</div>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

const ReceiptVoucher = () => {
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
        company_name: "company1",
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
        company_name: "company2",
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
        company_name: "company3",
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
        company_name: "company4",
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
        company_name: "company5",
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
      company_name: "",
    },
    {
      id: 1,
      name: "aseel",
      mobile_NO: "122323232",
      full_address: "sdfer",
      city: "efrr",
      VAT_NO: "3434",
      customer_number: 2,
      company_name: "company1",
    },
    {
      id: 2,
      name: "alaa",
      mobile_NO: "333333333",
      full_address: "dsf",
      city: "frrr",
      VAT_NO: "122122",
      customer_number: 3,
      company_name: "company2",
    },
    {
      id: 3,
      name: "fadi",
      mobile_NO: "444444444",
      full_address: "dfe",
      city: "cvdf",
      VAT_NO: "4444",
      customer_number: 4,
      company_name: "company3",
    },
    {
      id: 4,
      name: "sara",
      mobile_NO: "555555555",
      full_address: "gerg",
      city: "ccc",
      VAT_NO: "4343",
      customer_number: 5,
      company_name: "company4",
    },
    {
      id: 5,
      name: "lara",
      mobile_NO: "666666666",
      full_address: "rfgg",
      city: "sss",
      VAT_NO: "6666",
      customer_number: 6,
      company_name: "company5",
    },
  ]);

  const [customer, setCustomer] = useState(customers[0]);

  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false); // Toggle modal visibility
  const [
    isCreatingCustomerReceiptVoucher,
    setIsCreatingCustomerReceiptVoucher,
  ] = useState(false); // Toggle modal visibility

  const [newCustomer, setNewCustomer] = useState(""); // Store new customer name

  const handleChangeCustomer = (e) => {
    if (e.target.value === "create_new") {
      setIsCreatingCustomer(true); // Show popup to create a new customer
      return;
    }
    console.log(`print id of customer from database ${e.target.value}`);
    const selectedOption = customers.find((item) => item.id == e.target.value);
    setCustomer(selectedOption || customers[0]);
    // formik.setFieldValue("customer", selectedOption || customers[0]); // Update Formik state
  };
  console.log(`here after change on customer ${customer.name}`);
  console.table(customer);

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

  let currencies = ["NIS", "USD", "ERO"];
  let invoices = ["invoice 00001", "invoice 00002", "invoice 00003"];

  //here for invoice items
  const [invoiceItems, setInvoiceItems] = useState([
    // {
    //   item: items[0],
    //   itemPrice: null,
    //   itemCurrency: currencies[0],
    //   itemQuantity: null,
    //   totalPriceItem: null,
    // },
  ]);

  const [anotherItem, setAnotherItem] = useState({ exist: false, name: "" });

  const handleChangeItem = (e, invoiceItemIndex) => {
    const selectedValue = e.target.value;

    if (selectedValue === "create_new") {
      setIsCreatingItem(true);
      setSelectedItemIndex(invoiceItemIndex);
      return;
    }

    if (selectedValue === "another") {
      // If user selects "another", enable input field
      setInvoiceItems((prevInvoiceItems) =>
        prevInvoiceItems.map((item, index) =>
          index === invoiceItemIndex
            ? {
                ...item,
                itemPrice: null,
                itemCurrency: "NIS",
                // item: {
                //   id: "custom_item", // Custom item has no ID
                //   name: "Another Item", // Store user input as item name
                //   price: null,
                //   currency: "NIS",
                //   item_number: null,
                // },
                anotherItem: { exist: true, value: "" }, // Initialize another item
              }
            : item
        )
      );
      return;
    }

    console.log(`Selected item ID: ${selectedValue}`);

    // Find the selected item from the list
    const selectedOption =
      items.find((item) => item.id == selectedValue) || items[0];

    // Update the invoiceItems array correctly
    setInvoiceItems((prevInvoiceItems) =>
      prevInvoiceItems.map((item, index) =>
        index === invoiceItemIndex
          ? {
              ...item,
              item: selectedOption,
              itemPrice: selectedOption.price,
              itemCurrency: selectedOption.currency,
              totalPriceItem:
                (selectedOption.price || 0) * (item.itemQuantity || 0),
              anotherItem: { exist: false, value: "" }, // Reset anotherItem if selecting from list
            }
          : item
      )
    );
  };

  const handleChangeAnotherItem = (e, invoiceItemIndex) => {
    const newValue = e.target.value;

    setInvoiceItems((prevInvoiceItems) =>
      prevInvoiceItems.map((item, index) =>
        index === invoiceItemIndex
          ? {
              ...item,
              anotherItem: { exist: true, value: newValue }, // Update input value
              // item: {
              //   id: "custom_item", // Custom item has no ID
              //   name: newValue, // Store user input as item name
              //   price: null,
              //   currency: "NIS",
              //   item_number: null,
              // },
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
              itemQuantity: parseFloat(e.target.value || 0),
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
        itemCurrency: currencies[0],
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
  console.log(`my total price is:${totalPrice}`);
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
  // Function to update customer info
  const updateCustomerInfo = (customer) => ({
    Mobile_NO: customer?.mobile_NO || "",
    Full_Address: customer?.full_address || "",
    City: customer?.city || "",
    VAT_NO: customer?.VAT_NO || "",
  });

  // Effect to update customer details
  useEffect(() => {
    console.log(`Customer changed: ${customer?.id || "None"}`);
    setCustomerInfo(updateCustomerInfo(customer));
  }, [customer]); // ✅ Dependency is now clear
  // useEffect(() => {
  //   console.log(`here run first time and when customer change`);
  //   if (customer.id) {
  //     console.log(
  //       `here run first time and when customer change:${customer.id}`
  //     );
  //     setCustomerInfo((prev) => ({
  //       Mobile_NO: customer.mobile_NO,
  //       Full_Address: customer.full_address,
  //       City: customer.city,
  //       VAT_NO: customer.VAT_NO,
  //     }));
  //   } else {
  //     setCustomerInfo((prev) => ({
  //       Mobile_NO: "",
  //       Full_Address: "",
  //       City: "",
  //       VAT_NO: "",
  //     }));
  //   }
  // }, [formik.values.customer]); // Dependency array: useEffect runs when `customer` changes

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
        // formik.setFieldValue("customer", {
        //   ...selectedDeliveries[selectedDeliveries.length - 1].customer,
        // });
      } else {
        setCustomer({
          ...(customers.find((item) => item.id === null) || customers[0]),
        });
        // formik.setFieldValue("customer", {
        //   ...(customers.find((item) => item.id === null) || customers[0]),
        // });
      }
    } else {
      setCustomer({
        ...(customers.find((item) => item.id === null) || customers[0]),
      });
      // formik.setFieldValue("customer", {
      //   ...(customers.find((item) => item.id === null) || customers[0]),
      // });
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

  const [VAT, setVAT] = useState(0.17);
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
        if (invoiceItems.length === 0) {
          return [
            {
              item: items[0], // Default first item
              itemPrice: null,
              itemCurrency: currencies[0], // Default currency
              itemQuantity: null,
              totalPriceItem: null,
            },
          ];
        } else {
          // ✅ Return only invoiceItems that do NOT have `delivery_item_id`
          return prevInvoiceItems.filter((item) => !item.delivery_item_id);
        }
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

      // // Remove items belonging to unselected deliveries
      filteredInvoiceItems = filteredInvoiceItems.filter(
        (item) =>
          !item.delivery_item_id || // ✅ Keep items without `delivery_item_id`
          selectedDeliveryIds.includes(item.delivery_item_id) // ✅ Keep only relevant delivery items
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

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, label: "Cash", isChecked: true },
    { id: 2, label: "Cheque", isChecked: false },
    { id: 3, label: "Cash & Cheque", isChecked: false },
    { id: 4, label: "Bank Transfer", isChecked: false },
  ]);

  console.table(paymentMethods);

  const handlePaymentMethodsChange = (id) => {
    setPaymentMethods((prevPaymentMethods) =>
      prevPaymentMethods.map((paymentMethod) => ({
        ...paymentMethod,
        isChecked: paymentMethod.id === id, // Set only the selected one to true, others false
      }))
    );
  };

  const [customerReceiptVoucher, setCustomerReceiptVoucher] = useState(
    customers[0]
  );

  console.log(`customerReceiptVoucher :${customerReceiptVoucher}`);
  console.dir(customerReceiptVoucher);

  const handleChangeCustomerReceiptVoucher = (e) => {
    if (e.target.value === "create_new") {
      setIsCreatingCustomerReceiptVoucher(true); // Show popup to create a new customer
      return;
    }
    console.log(
      `print id of customer ReceiptVoucher from database ${e.target.value}`
    );
    const selectedOption = customers.find((item) => item.id == e.target.value);
    setCustomerReceiptVoucher(selectedOption || customers[0]);
  };

  const [amount, setAmount] = useState();

  const handleChangeAmount = (e) => {
    setAmount(e.target.value); // Update the state with the new amount
  };
  console.log(`amount : ${amount}`);

  const [onAccountOf, setOnAccountOf] = useState("");

  const handleChangeOnAccountOf = (e) => {
    setOnAccountOf(e.target.value);
  };

  console.log(`onAccountOf : ${onAccountOf}`);

  const [totalAmountInWords, setTotalAmountInWords] = useState("");

  const [note, setNote] = useState("");

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };

  const [currencyReceiptVoucher, setCurrencyReceiptVoucher] = useState("NIS");

  const handleChangeCurrencyReceiptVoucher = (e) => {
    setCurrencyReceiptVoucher(e.target.value);
  };
  const [invoiceOption, setInvoiceOption] = useState("invoic 00001");

  const handleChangeInvoiceOption = (e) => {
    setInvoiceOption(e.target.value);
  };

  const [signatureReceiptVoucher, setSignatureReceiptVoucher] = useState({
    urlSign: null,
    urlFile: null,
  }); // here save the signature value just when not null if null does not save
  console.log(
    `test receipt voucher urlSign ${signatureReceiptVoucher.urlSign}`
  );
  console.log(
    `test receipt voucher urlFile ${signatureReceiptVoucher.urlFile}`
  );

  // useEffect(() => {
  //   const updatedCustomer =
  //     customers.find((c) => c.id === customer.id) || customers[0];
  //   setCustomerReceiptVoucher(updatedCustomer);
  // }, [customer]);
  useEffect(() => {
    const updatedCustomer =
      customers.find((c) => c.id === customer.id) || customers[0];
    setCustomerReceiptVoucher(updatedCustomer);
  }, [customer]);

  useEffect(() => {
    isIncludeVAT || isIncludeItemVAT
      ? setAmount(totalPriceWithVAT)
      : setAmount(totalPriceWithoutVAT);
  }, [totalPriceWithVAT, totalPriceWithoutVAT]);

  const [cheques, setCheques] = useState([
    {
      bank_name: "",
      cheque_no: null,
      bank_no: null,
      branch_no: null,
      cheque_amount: null,
      date: new Date(),
      cheque_image: "",
    },
  ]);
  console.table(cheques);

  const handleChangeBankName = (e, chequeIndex) => {
    setCheques((prevCheques) =>
      prevCheques.map((cheque, index) =>
        index === chequeIndex
          ? {
              ...cheque,
              bank_name: e.target.value,
            }
          : cheque
      )
    );
  };

  const handleChangeChequeNo = (e, chequeIndex) => {
    setCheques((prevCheques) =>
      prevCheques.map((cheque, index) =>
        index === chequeIndex
          ? {
              ...cheque,
              cheque_no: e.target.value,
            }
          : cheque
      )
    );
  };
  const handleChangeBankNo = (e, chequeIndex) => {
    setCheques((prevCheques) =>
      prevCheques.map((cheque, index) =>
        index === chequeIndex
          ? {
              ...cheque,
              bank_no: e.target.value,
            }
          : cheque
      )
    );
  };
  const handleChangeBranchNo = (e, chequeIndex) => {
    setCheques((prevCheques) =>
      prevCheques.map((cheque, index) =>
        index === chequeIndex
          ? {
              ...cheque,
              branch_no: e.target.value,
            }
          : cheque
      )
    );
  };

  const handleChangeChequeAmount = (e, chequeIndex) => {
    setCheques((prevCheques) =>
      prevCheques.map((cheque, index) =>
        index === chequeIndex
          ? {
              ...cheque,
              cheque_amount: e.target.value,
            }
          : cheque
      )
    );
  };

  const handleChangeChequeDate = (date, chequeIndex) => {
    setCheques((prevCheques) =>
      prevCheques.map((cheque, index) =>
        index === chequeIndex
          ? {
              ...cheque,
              date: date,
            }
          : cheque
      )
    );
  };

  // const [chequeImage, setChequeImage] = useState({
  //   urlFile: null,
  // });
  // console.log(`cheque Image : ${chequeImage.urlFile}`);

  const handleChequeImageChange = (file, index) => {
    console.log(`Updating cheque at index: ${index} with file: ${file}`); // ✅ Debugging log

    setCheques((prevCheques) =>
      prevCheques.map((cheque, i) =>
        i === index ? { ...cheque, cheque_image: file } : cheque
      )
    );
  };
  const deleteCheque = (index) => {
    setCheques((prevCheques) => prevCheques.filter((_, i) => i !== index));
  };

  let addCheque = () => {
    setCheques((prevCheques) => [
      ...prevCheques,
      {
        bank_name: "",
        cheque_no: null,
        bank_no: null,
        branch_no: null,
        cheque_amount: null,
        date: new Date(),
        cheque_image: "",
      },
    ]);
  };

  const totalCheque = useMemo(() => {
    return cheques.reduce(
      (sum, cheque) => sum + (parseFloat(cheque.cheque_amount) || 0),
      0
    );
  }, [cheques]);

  const [cash, setCash] = useState(null);
  const [messageIsPricePaid, setMessageIsPricePaid] = useState("");
  const [transferValue, setTransferValue] = useState(null);
  const [totalCashAndCheque, setTotalCashAndCheque] = useState(null);

  useEffect(() => {
    setTotalCashAndCheque((cash || 0) + (totalCheque || 0));
  }, [cash, totalCheque]);

  useEffect(() => {
    // Check if ALL items have a valid `totalPriceItem`
    const allValid =
      invoiceItems.length > 0 &&
      invoiceItems.every(
        (item) =>
          item.totalPriceItem !== null &&
          item.totalPriceItem !== undefined &&
          !isNaN(item.totalPriceItem) // Ensure it's a number
      );

    console.log(`Check price validity: ${allValid}`); // Should return false initially
    if (!allValid) {
      setMessageIsPricePaid("");
    }
    if (allValid && totalPrice > 0) {
      // Determine which payment method is checked
      const isCashChecked = paymentMethods.find(
        (method) => method.label === "Cash"
      )?.isChecked;
      const isChequeChecked = paymentMethods.find(
        (method) => method.label === "Cheque"
      )?.isChecked;
      const isCashAndChequeChecked = paymentMethods.find(
        (method) => method.label === "Cash & Cheque"
      )?.isChecked;
      const isBankTransferChecked = paymentMethods.find(
        (method) => method.label === "Bank Transfer"
      )?.isChecked;

      let isPaid = false;

      if (isCashChecked) {
        isPaid = totalPrice === (cash || 0);
      } else if (isChequeChecked) {
        isPaid = totalPrice === (totalCheque || 0);
      } else if (isCashAndChequeChecked) {
        isPaid = totalPrice === (cash || 0) + (totalCheque || 0);
      } else if (isBankTransferChecked) {
        isPaid = totalPrice === (transferValue || 0);
      }

      setMessageIsPricePaid(
        isPaid ? "Thank you for paying" : "Please pay the full invoice amount"
      );
    }
  }, [
    cash,
    totalCheque,
    transferValue,
    invoiceItems,
    totalPrice,
    paymentMethods,
  ]); // ✅ Added paymentMethods as a dependency

  const [fromBankName, setFromBankName] = useState("");
  const [bankTransferNO, setBankTransferNO] = useState(null);
  useEffect(() => {
    let selectedPayment = paymentMethods.find(
      (method) => method.isChecked
    )?.label;
    let amountInWords = "";

    switch (selectedPayment) {
      case "Cash":
        amountInWords = convertNumberToWords(cash || 0);
        break;
      case "Cheque":
        amountInWords = convertNumberToWords(totalCheque || 0);
        break;
      case "Cash & Cheque":
        amountInWords = convertNumberToWords(totalCashAndCheque || 0);
        break;
      case "Bank Transfer":
        amountInWords = convertNumberToWords(transferValue || 0);
        break;
      default:
        amountInWords = "";
        break;
    }

    setTotalAmountInWords(amountInWords);
  }, [cash, totalCheque, totalCashAndCheque, transferValue, paymentMethods]);
  const [receiptVoucherNO, setReceiptVoucherNO] = useState("1".padStart(5, 0));

  const [clearButt, setClearButt] = useState(false);
  const defaultValues = {
    customer: {
      customer: customers[0], // Reset customer to the first one
      customerInfo: {
        Mobile_NO: "",
        Full_Address: "",
        City: "",
        VAT_NO: "",
      },
    },
    items: [
      {
        item: items[0], // Default first item
        itemPrice: null,
        itemCurrency: currencies[0], // Default currency
        itemQuantity: null,
        totalPriceItem: null,
      },
    ],
    invoiceSummary: {
      isIncludeVAT: false,
      isIncludeItemVAT: false,
      totalPrice: 0,
      totalPriceWithoutVAT: 0,
      VAT: 0.17,
      totalVAT: 0,
      totalPriceWithVAT: 0,
      totalPriceInWords: "",
      signatureInvoice: {
        urlSign: null,
        urlFile: null,
      },
    },
  };

  const getPaidValue = () => {
    const selectedPayment = paymentMethods.find((method) => method.isChecked);

    if (!selectedPayment || selectedPayment.id === 1) {
      return false;
    }

    const basePaidData = {
      type: selectedPayment.label,
      customerReceiptVoucher,
      amount,
      onAccountOf,
      currencyReceiptVoucher,
      totalAmountInWords,
      note,
      signatureReceiptVoucher,
      receiptVoucherNO,
    };

    switch (selectedPayment.label) {
      case "Cash":
        return { ...basePaidData, amountPaid: { cash } };
      case "Cheque":
        return { ...basePaidData, amountPaid: { cheques, totalCheque } };
      case "Cash & Cheque":
        return { ...basePaidData, amountPaid: { cheques, totalCheque, cash } };
      case "Bank Transfer":
        return {
          ...basePaidData,
          amountPaid: { fromBankName, bankTransferNO, transferValue },
        };
      default:
        return false;
    }
  };
  const resetAllStates = () => {
    // ✅ Reset all state values at once
    setCustomer(defaultValues.customer.customer);
    setCustomerInfo(defaultValues.customer.customerInfo);
    setInvoiceItems(defaultValues.items);
    setIsIncludeVAT(defaultValues.invoiceSummary.isIncludeVAT);
    setIsIncludeItemVAT(defaultValues.invoiceSummary.isIncludeItemVAT);
    setTotalPriceWithoutVAT(defaultValues.invoiceSummary.totalPriceWithoutVAT);
    setVAT(defaultValues.invoiceSummary.VAT);
    setTotalVAT(defaultValues.invoiceSummary.totalVAT);
    setTotalPriceWithVAT(defaultValues.invoiceSummary.totalPriceWithVAT);
    setTotalPriceInWords(defaultValues.invoiceSummary.totalPriceInWords);
    setSignatureInvoice(defaultValues.invoiceSummary.signatureInvoice);
    // ✅ Reset payment-related states
    setPaymentMethods([
      { id: 1, label: "Unpaid", isChecked: true },
      { id: 2, label: "Cash", isChecked: false },
      { id: 3, label: "Cheque", isChecked: false },
      { id: 4, label: "Cash & Cheque", isChecked: false },
      { id: 5, label: "Bank Transfer", isChecked: false },
    ]);

    // ✅ Reset cheque-related states
    setCheques([
      {
        bank_name: "",
        cheque_no: null,
        bank_no: null,
        branch_no: null,
        cheque_amount: null,
        date: new Date(),
        cheque_image: "",
      },
    ]);

    // setTotalCheque(0);
    setCash(0);
    setFromBankName("");
    setBankTransferNO("");
    setTransferValue("");

    // ✅ Reset file states
    setSignatureReceiptVoucher({ urlSign: null, urlFile: null });
    // setInvoicePhoto(null);
    setCustomerReceiptVoucher(customers[0]);
    setCurrencyReceiptVoucher("NIS");
    setAmount(null);
    setOnAccountOf("On invoice no 0001");
    setNote("");
    setTotalAmountInWords("");
    setSelectedDeliveries([]);
    setReceiptVoucherNO("1".padStart(5, 0));
  };

  const validationSchema = yup.object().shape({
    // Customer section
    customer: yup.object().shape({
      customer: yup.object().shape({
        id: yup.number().required("Customer is required"),
      }),
      customerInfo: yup.object().shape({
        Mobile_NO: yup.string().required("Mobile number is required"),
        Full_Address: yup.string().required("Full address is required"),
        City: yup.string().required("City is required"),
        VAT_NO: yup.string().required("VAT number is required"),
      }),
    }),

    // Items section
    items: yup.array().of(
      yup.object().shape({
        item: yup.object().shape({
          id: yup.number(),
          // id: yup.number().required("Item is required"),
        }),
        itemPrice: yup
          .number()
          .typeError("Item price must be a number")
          .positive("Item price must be greater than 0")
          .required("Item price is required"),

        itemQuantity: yup
          .number()
          .typeError("Quantity must be a number")
          .positive("Quantity must be greater than 0")
          .integer("Quantity must be an integer")
          .required("Item quantity is required"),

        // ✅ Conditionally require `anotherItem.value` only if `exist: true`
        anotherItem: yup.object().shape({
          exist: yup.boolean(),
          value: yup.string().when("exist", {
            is: true,
            then: (schema) => schema.required("Another item value is required"),
            otherwise: (schema) => schema.notRequired(),
          }),
        }),
      })
    ),

    // Invoice summary section
    invoiceSummary: yup.object().shape({
      signatureInvoice: yup
        .object()
        .shape({
          urlSign: yup.string().nullable(),
          urlFile: yup.string().nullable(),
        })
        .test(
          "signature-required",
          "At least one signature (drawn or uploaded) is required",
          (value) => value?.urlSign || value?.urlFile // ✅ At least one must be provided
        ),
    }),
  });

  const formik = useFormik({
    initialValues: {
      invoiceNO: "1".padStart(5, 0),
      selectedDeliveries,
      customer: {
        customer: { ...customer },
        customerInfo: { ...customerInfo },
      },
      items: [...invoiceItems],
      invoiceSummary: {
        isIncludeVAT,
        isIncludeItemVAT,
        totalPrice,
        totalPriceWithoutVAT,
        VAT,
        totalVAT,
        totalPriceWithVAT,
        totalPriceInWords,
        signatureInvoice,
      },
      paid: getPaidValue(), // Dynamically assign paid value
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Submitting Invoice Data:", values);
      dispatch(saveInHistory(values));
      resetAllStates();
      resetForm({ values: defaultValues });
      setClearButt(!clearButt);
    },
  });

  console.log("before and after reset Data :", formik.values);
  // ✅ Sync Formik values when customer state changes
  useEffect(() => {
    const updatedInvoiceSummary = {
      isIncludeVAT,
      isIncludeItemVAT,
      totalPrice,
      totalPriceWithoutVAT,
      VAT,
      totalVAT,
      totalPriceWithVAT,
      totalPriceInWords,
      signatureInvoice,
    };

    formik.setValues((prevValues) => ({
      ...prevValues,
      invoiceNO: "1".padStart(5, 0),
      customer: {
        customer: { ...customer },
        customerInfo: { ...customerInfo },
      },
      items: [...invoiceItems],
      invoiceSummary: updatedInvoiceSummary,
      selectedDeliveries,
      paid: getPaidValue(), // ✅ Dynamically update "paid" value inside useEffect
    }));
  }, [
    selectedDeliveries,
    customer,
    customerInfo,
    invoiceItems,
    isIncludeVAT,
    isIncludeItemVAT,
    totalPrice,
    totalPriceWithoutVAT,
    VAT,
    totalVAT,
    totalPriceWithVAT,
    totalPriceInWords,
    signatureInvoice,
    paymentMethods, // ✅ Ensure changes in payment method trigger an update
    customerReceiptVoucher,
    amount,
    onAccountOf,
    currencyReceiptVoucher,
    totalAmountInWords,
    note,
    signatureReceiptVoucher,
    cash,
    cheques,
    totalCheque,
    fromBankName,
    bankTransferNO,
    transferValue,
    receiptVoucherNO,
  ]);

  // useEffect(() => {
  //   invoiceItems.forEach((invoiceItem, index) => {
  //     if (invoiceItem?.anotherItem?.exist) {
  //       formik.setFieldError(`items.${index}.item.id`, "");
  //     }
  //   });
  // }, [invoiceItems]);
  const [onInvoice, setOnInvoice] = useState(true);
  const [showVoucherSelection, setShowVoucherSelection] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    customer: "",
    amount: "",
    invoice: "",
    currency: "USD",
    details: "",
    notes: "",
    signature: "",
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVoucherTypeSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <>
      <Header />
      <form
        onSubmit={formik.handleSubmit}
        className="p-10 border grid gap-10 bg-gray-50 min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <Wallet className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Receivables Management
            </h1>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SummaryCard
              title="Cash Receipts"
              icon={Banknote}
              stats={
                <>
                  <StatItem
                    label="Total Receipts"
                    value={receiptData.cash.total}
                  />
                  <StatItem
                    label="Total Amount"
                    value={formatCurrency(receiptData.cash.amount)}
                  />
                  <StatItem
                    label="Last Receipt"
                    value={formatDate(receiptData.cash.lastReceipt)}
                  />
                </>
              }
            />

            <SummaryCard
              title="Cheque Receipts"
              icon={CreditCard}
              stats={
                <>
                  <StatItem
                    label="Total Cheques"
                    value={receiptData.cheque.total}
                  />
                  <StatItem
                    label="Total Amount"
                    value={formatCurrency(receiptData.cheque.amount)}
                  />
                  <StatItem
                    label="Postdated Cheques"
                    value={receiptData.cheque.postdated}
                  />
                  <StatItem
                    label="Returned Cheques"
                    value={receiptData.cheque.returned}
                  />
                </>
              }
            />

            <SummaryCard
              title="Cash & Cheque Receipts"
              icon={Wallet}
              stats={
                <>
                  <StatItem
                    label="Total Receipts"
                    value={receiptData["cash&cheque"].total}
                  />
                  <StatItem
                    label="Total Amount"
                    value={formatCurrency(receiptData["cash&cheque"].amount)}
                  />
                </>
              }
            />

            <SummaryCard
              title="Bank Transfers"
              icon={Bank}
              stats={
                <>
                  <StatItem
                    label="Total Transfers"
                    value={receiptData.bankTransfer.total}
                  />
                  <StatItem
                    label="Total Amount"
                    value={formatCurrency(receiptData.bankTransfer.amount)}
                  />
                  <StatItem
                    label="Last Transfer"
                    value={formatDate(receiptData.bankTransfer.lastTransfer)}
                  />
                </>
              }
            />

            <SummaryCard
              title="Unpaid Receipts"
              icon={AlertCircle}
              className="md:col-span-2 lg:col-span-1"
              stats={
                <>
                  <StatItem
                    label="Unpaid Receipts"
                    value={receiptData.unpaid.total}
                  />
                  <StatItem
                    label="Total Due"
                    value={formatCurrency(receiptData.unpaid.amount)}
                  />
                  <StatItem
                    label="Customers"
                    value={receiptData.unpaid.customers}
                  />
                </>
              }
            />
          </div>

          {/* Add New Receipt Section with Voucher Type Selection */}
          <div className="mb-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowVoucherSelection(!showVoucherSelection)}
                  className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Voucher Type Selection */}
          {/* <div
            className={`bg-white rounded-xl shadow-sm p-6 mb-8 transition-all duration-300 ${
              showVoucherSelection
                ? "opacity-100 visible"
                : "opacity-0 invisible hidden"
            }`}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Select Receipt Voucher Type
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(RECEIPT_TYPES).map(([type, { label }]) => (
                <button
                  key={type}
                  onClick={() => handleVoucherTypeSelect(type)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    selectedType === type
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div> */}

          {/* Voucher Details Form */}
          {/* {selectedType && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-50">
                  {(() => {
                    const Icon = RECEIPT_TYPES[selectedType].icon;
                    return <Icon className="w-6 h-6 text-indigo-600" />;
                  })()}
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {RECEIPT_TYPES[selectedType].label} Receipt Details
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer
                    </label>
                    <div className="relative">
                      <select
                        name="customer"
                        value={formData.customer}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="">Select customer</option>
                        <option value="1">Customer 1</option>
                        <option value="2">Customer 2</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice Number
                    </label>
                    <input
                      type="text"
                      name="invoice"
                      value={formData.invoice}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter invoice number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <div className="relative">
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Details
                    </label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      rows={3}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter payment details"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Add any additional notes"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Signature
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="signature"
                            className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload signature</span>
                            <input
                              id="signature"
                              name="signature"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType(null);
                    setShowVoucherSelection(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Receipt
                </button>
              </div>
            </div>
          )} */}
        </div>

        <section
          className={`border rounded-[20px] p-10 grid gap-10 bg-white ${
            showVoucherSelection
              ? "opacity-100 visible"
              : "opacity-0 invisible hidden"
          }`}
        >
          <h1 className="text-2xl font-semibold">Payment Method</h1>
          <div className="center-v gap-10">
            {paymentMethods.map((paymentMethod) => (
              <CheckBox
                key={paymentMethod.id}
                isChecked={paymentMethod.isChecked}
                handleChange={() =>
                  handlePaymentMethodsChange(paymentMethod.id)
                }
                label={paymentMethod.label}
              />
            ))}
          </div>
          <div className="border grid gap-10">
            <HeaderReceiptVoucher
              name={customer.company_name}
              title="Receipt Voucher"
              invoiceNum={formik.values.invoiceNO}
              receiptVoucherNum={receiptVoucherNO}
            />

            <div className="px-10 grid gap-10">
              <div className="flex-center-v-end-x text-2xl">
                {new Date().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>

              <div className=" grid-4-cols-center-vx gap-10">
                <CreatableDropDown
                  options={customers}
                  option={customerReceiptVoucher}
                  handleChangeOption={handleChangeCustomerReceiptVoucher}
                  valueKey="id"
                  label="name"
                  width="w-64"
                />

                <Input
                  key="amount"
                  name="Price"
                  value={amount || ""}
                  handleChange={handleChangeAmount}
                  label="Amount to be paid"
                  width="w-48"
                />
                <div className="center-v gap-5">
                  <CheckBox
                    isChecked={onInvoice}
                    handleChange={(e) => setOnInvoice(e.target.checked)}
                    label="On invoice"
                  />

                  {onInvoice ? (
                    <DropDown
                      options={invoices}
                      option={invoiceOption}
                      handleChangeOption={handleChangeInvoiceOption}
                      label="Select invoice"
                      width="w-48"
                    />
                  ) : (
                    <Input
                      key="on_account_of"
                      name="on_account_of"
                      value={onAccountOf || ""}
                      handleChange={handleChangeOnAccountOf}
                      label="On account of"
                      width="w-48"
                    />
                  )}
                </div>

                <DropDown
                  options={currencies}
                  option={currencyReceiptVoucher}
                  handleChangeOption={handleChangeCurrencyReceiptVoucher}
                  label="Select Item Currency"
                  width="w-40"
                />
              </div>
              {messageIsPricePaid && (
                <div className=" ">
                  <p
                    className={` text-sm font-medium ${
                      messageIsPricePaid === "Thank you for paying"
                        ? "text-green-600 bg-green-100 p-2 rounded-md"
                        : "text-yellow-600 bg-yellow-100 p-2 rounded-md"
                    }`}
                  >
                    {messageIsPricePaid}
                  </p>
                </div>
              )}

              {(paymentMethods?.[0]?.isChecked ||
                paymentMethods?.[2]?.isChecked) && (
                <div className="border p-5 grid gap-5">
                  <h1 className="text-2xl font-semibold ml-2">Cash</h1>
                  <div className="center-v">
                    <Input
                      key={"cash"}
                      name={"Price"}
                      value={cash || ""} // Ensure value is never null
                      handleChange={(e) =>
                        setCash(parseFloat(e.target.value) || 0)
                      }
                      label={"Cash"}
                      width="w-40"
                    />
                  </div>
                </div>
              )}

              {(paymentMethods?.[1]?.isChecked ||
                paymentMethods?.[2]?.isChecked) && (
                <div className=" p-5 border grid gap-5">
                  <div className="flex-center-v-space-between">
                    <h1 className="text-2xl font-semibold ml-2">Cheque</h1>
                    <button
                      className="bg-green-600 text-white w-10 h-10 rounded-full flex-vx-center relative group"
                      type="button"
                      onClick={addCheque}
                    >
                      <AddIcon />
                      {/* Tooltip */}
                      <span className="absolute -top-11 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-lg rounded-md px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Add Cheque
                      </span>
                    </button>
                  </div>

                  {cheques.map((cheque, index) => {
                    return (
                      <div className="grid grid-cols-8 items-center justify-items-center ">
                        <Input
                          key={"bank_name"}
                          name={"bank_name"}
                          value={cheque.bank_name || ""} // Ensure value is never null
                          handleChange={(e) => handleChangeBankName(e, index)}
                          label={"Bank name"}
                          width="w-48"
                        />
                        <Input
                          key={"cheque_no"}
                          name={"cheque_no"}
                          value={cheque.cheque_no || ""} // Ensure value is never null
                          handleChange={(e) => handleChangeChequeNo(e, index)}
                          label={"Cheque NO"}
                          width="w-40"
                        />
                        <Input
                          key={"bank_no"}
                          name={"bank_no"}
                          value={cheque.bank_no || ""} // Ensure value is never null
                          handleChange={(e) => handleChangeBankNo(e, index)}
                          label={"Bank NO"}
                          width="w-40"
                        />
                        <Input
                          key={"branch_no"}
                          name={"branch_no"}
                          value={cheque.branch_no || ""} // Ensure value is never null
                          handleChange={(e) => handleChangeBranchNo(e, index)}
                          label={"Branch NO"}
                          width="w-40"
                        />
                        <Input
                          key="cheque_amount"
                          name="Price"
                          value={cheque.cheque_amount || ""}
                          handleChange={(e) =>
                            handleChangeChequeAmount(e, index)
                          }
                          label="Cheque amount"
                          width="w-40"
                        />
                        <div className="flex flex-col items-start ">
                          <label className="text-gray-700 font-medium">
                            Select Date:
                          </label>
                          <DatePicker
                            id="custom-datepicker"
                            selected={cheque.date}
                            onChange={(date) =>
                              handleChangeChequeDate(date, index)
                            }
                            className="w-40 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <FileInput
                          setFile={(file) =>
                            handleChequeImageChange(file, index)
                          } // ✅ Correctly pass index
                          file={{ urlFile: cheque.cheque_image }}
                          name="Choose Cheque Image"
                          index={index} // ✅ Explicitly pass the index
                        />

                        <button
                          className="relative group w-10 h-10 flex-vx-center"
                          onClick={() => deleteCheque(index)}
                        >
                          <DeleteIcon />

                          {/* Tooltip */}
                          <span className="absolute -top-11 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-lg rounded-md px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Delete Cheque
                          </span>
                        </button>
                      </div>
                    );
                  })}
                  <div className="  flex-center-v-end-x">
                    <Input
                      key={"total_cheque"}
                      name={"Price"}
                      value={totalCheque || ""}
                      label={"Total cheque "}
                      width="w-40"
                      readOnly={true}
                    />
                  </div>
                </div>
              )}
              {paymentMethods?.[2]?.isChecked && (
                <Input
                  key={"total_cash_cheque"}
                  name={"Price"}
                  value={totalCashAndCheque || ""}
                  label={"Total cash and cheque "}
                  width="w-48"
                  readOnly={true}
                />
              )}
              {paymentMethods?.[3]?.isChecked && (
                <div className="px-10 grid gap-5">
                  <h1 className="text-2xl font-semibold ml-2">Bank</h1>
                  <div className="grid-5-cols-center-vx gap-10 ">
                    <Input
                      key={"from_bank_name"}
                      name={"from_bank_name"}
                      value={fromBankName || ""} // Ensure value is never null
                      handleChange={(e) =>
                        setFromBankName(e.target.value || "")
                      }
                      label={"From bank name"}
                      width="w-48"
                    />

                    <Input
                      key={"bank_transfer_no"}
                      name={"bank_no"}
                      value={bankTransferNO || ""} // Ensure value is never null
                      handleChange={(e) =>
                        setBankTransferNO(parseFloat(e.target.value) || 0)
                      }
                      label={"Bank transfer NO"}
                      width="w-40"
                    />
                    <Input
                      key={"transfer value"}
                      name={"Price"}
                      value={transferValue || ""} // Ensure value is never null
                      handleChange={(e) =>
                        setTransferValue(parseFloat(e.target.value) || 0)
                      }
                      label={"Transfer value"}
                      width="w-40"
                    />
                  </div>
                </div>
              )}
              <div className=" ">
                <Input
                  key="total_price_in_words"
                  name="total_price_in_words"
                  value={totalAmountInWords || ""}
                  label="Total Amount in Words"
                  readOnly
                  width="w-80"
                />
              </div>
              <Input
                key="note"
                name="note"
                value={note || ""}
                handleChange={handleChangeNote}
                label="Note"
                width="w-full"
              />
              <div className="grid-2-cols-center-vx">
                <div className="w-50rem">
                  <p className="text-lg font-medium center-x">
                    Enter Your Signature
                  </p>
                  <Signature
                    setSignature={setSignatureReceiptVoucher}
                    signature={signatureReceiptVoucher}
                  />
                </div>

                <div className="border">
                  {signatureReceiptVoucher?.urlSign ||
                  signatureReceiptVoucher?.urlFile ? (
                    <img
                      src={
                        signatureReceiptVoucher?.urlFile ||
                        signatureReceiptVoucher?.urlSign
                      }
                      alt="Signature"
                      className="w-[18rem] h-[9rem]"
                    />
                  ) : (
                    "Receipt Voucher Signature"
                  )}
                </div>

                <div className="w-full flex-vx-center flex-col">
                  <div className="font-semibold text-xl tracking-[0.2rem]">
                    OR
                  </div>
                  <FileInput
                    setFile={setSignatureReceiptVoucher}
                    file={signatureReceiptVoucher}
                    name="Choose Signature Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`border rounded-[20px] p-10 grid gap-10 bg-white ${
            showVoucherSelection
              ? "opacity-100 visible"
              : "opacity-0 invisible hidden"
          }`}
        >
          <button
            type="button"
            class="w-40 px-4 py-2 bg-green-600 text-white text-xl font-semibold rounded-md hover:bg-green-500 active:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
          >
            Save
          </button>
        </section>
      </form>
    </>
  );
};

export default ReceiptVoucher;
