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
import { saveInHistory, saveAndPrint } from "../actions/invoice.js";
import Cookies from "js-cookie";
import ReactDOM from "react-dom";
import PrintableComponent from "./index.js"; // Adjust the import path
import { useNavigate } from "react-router-dom";

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

// const ErrorText = ({ name }) => (
//   <ErrorMessage name={name}>
//     {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
//   </ErrorMessage>
// );

const DeliveryInvoices = () => {
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

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, label: "Unpaid", isChecked: true },
    { id: 2, label: "Cash", isChecked: false },
    { id: 3, label: "Cheque", isChecked: false },
    { id: 4, label: "Cash & Cheque", isChecked: false },
    { id: 5, label: "Bank Transfer", isChecked: false },
  ]);
  //req get invoice no , receipt voucher no =>set formik values invoice no , receipt voucher, onAccountOf
  //req get customers
  //req get items
  //req get delivery invoices
  //req get vat
  const [clickedButton, setClickedButton] = useState(null);
  const navigate = useNavigate();
  // const printComponent = (invoiceData) => {
  //   const navigate = useNavigate();

  //   // Navigate to the print page and pass state
  //   navigate("/print-invoice", { state: { invoiceData } });
  // };

  const basePaidSchema = yup.object().shape({
    type: yup.string().required(),
    customerReceiptVoucher: yup.object().shape({ id: yup.number().required() }),
    amount: yup.number().required().positive(),
    onAccountOf: yup.string().required(),
    signatureReceiptVoucher: yup.string().required(),
  });

  // Schema for "Cash" type
  const cashSchema = yup.object().shape({
    amountPaid: yup.object().shape({
      cash: yup.number().required().positive(),
    }),
  });

  // Schema for "Cheque" type
  const chequeSchema = yup.object().shape({
    amountPaid: yup.object().shape({
      cheques: yup
        .array()
        .of(
          yup.object().shape({
            bank_name: yup.string().required(),
            cheque_no: yup.string().required(),
            bank_no: yup.string().required(),
            branch_no: yup.string().required(),
            cheque_amount: yup.number().required(),
            date: yup.date().required(),
            cheque_image: yup.string().required(),
          })
        )
        .required(),
    }),
  });

  // Schema for "Cash & Cheque" type
  const cashAndChequeSchema = yup.object().shape({
    amountPaid: yup.object().shape({
      cash: yup.number().required().positive(),
      cheques: yup
        .array()
        .of(
          yup.object().shape({
            bank_name: yup.string().required(),
            cheque_no: yup.string().required(),
            bank_no: yup.string().required(),
            branch_no: yup.string().required(),
            cheque_amount: yup.number().required(),
            date: yup.date().required(),
            cheque_image: yup.string().required(),
          })
        )
        .required(),
    }),
  });

  // Schema for "Bank Transfer" type
  const bankTransferSchema = yup.object().shape({
    amountPaid: yup.object().shape({
      fromBankName: yup.string().required(),
      bankTransferNO: yup.string().required(),
      transferValue: yup.number().required().positive(),
    }),
  });

  const unpaidSchema = yup.object().shape({
    // Skip validation for all fields in basePaidSchema
    customerReceiptVoucher: yup.object().notRequired(),
    amount: yup.number().notRequired(),
    onAccountOf: yup.string().notRequired(),
    currencyReceiptVoucher: yup.string().notRequired(),
    signatureReceiptVoucher: yup.string().notRequired(),

    // Skip validation for amountPaid
    amountPaid: yup.object().notRequired(),
  });

  // Function to dynamically build the schema based on the type
  const getPaidSchema = (type) => {
    switch (type) {
      case "Cash":
        return basePaidSchema.concat(cashSchema);
      case "Cheque":
        return basePaidSchema.concat(chequeSchema);
      case "Cash & Cheque":
        return basePaidSchema.concat(cashAndChequeSchema);
      case "Bank Transfer":
        return basePaidSchema.concat(bankTransferSchema);
      case "Unpaid":
        return unpaidSchema;
      default:
        return basePaidSchema; // Fallback to base schema
    }
  };

  const validationSchema = yup.object({
    // Customer section
    customer: yup.object().shape({
      customer: yup.object().shape({
        id: yup.number().required(),
      }),
      customerInfo: yup.object().shape({
        Mobile_NO: yup.string().required(),
        Full_Address: yup.string().required(),
        City: yup.string().required(),
        VAT_NO: yup.string().required(),
      }),
    }),

    // Items section
    invoiceItems: yup.array().of(
      yup.object().shape({
        item: yup.object().shape({
          id: yup.number().required(),
          value: yup
            .string()
            .test(
              "is-required-if-another-item",
              "Another Item value is required",
              function (value) {
                const { id } = this.parent;
                if (id === -1) {
                  return !!value;
                }

                return true;
              }
            ),
        }),
        itemPrice: yup.number().typeError().positive().required(),

        itemQuantity: yup.number().typeError().positive().integer().required(),
      })
    ),

    // Invoice summary section
    invoiceSummary: yup.object().shape({
      signatureInvoice: yup.string().required(),
    }),

    // Paid section (dynamically built based on type)
    paid: yup.lazy((values) => getPaidSchema(values.type)),
  });

  const formik = useFormik({
    initialValues: {
      invoiceNO: "1".padStart(5, 0),
      selectedDeliveries: [],
      customer: {
        customer: customers[0],
        customerInfo: {
          Mobile_NO: "",
          Full_Address: "",
          City: "",
          VAT_NO: "",
        },
      },
      invoiceItems: [],
      invoiceSummary: {
        isIncludeVAT: false,
        isIncludeItemVAT: false,
        totalPrice: 0,
        totalPriceWithoutVAT: null,
        VAT: 0.17,
        totalVAT: null,
        totalPriceWithVAT: null,
        totalPriceInWords: "",
        signatureInvoice: "",
      },
      paid: {
        type: paymentMethods.find((m) => m.isChecked)?.label || "",
        customerReceiptVoucher: customers[0],
        amount: null,
        onAccountOf: "On invoice no 00001",
        currencyReceiptVoucher: "NIS",
        totalAmountInWords: "",
        note: "",
        signatureReceiptVoucher: "",
        receiptVoucherNO: "1".padStart(5, 0),
        // For each payment type, define nested fields:
        amountPaid: {
          cash: null,
          cheques: [
            {
              bank_name: "",
              cheque_no: null,
              bank_no: null,
              branch_no: null,
              cheque_amount: null,
              date: new Date(),
              cheque_image: "",
            },
          ], // you might sync this if needed
          totalCheque: 0,
          totalCashAndCheque: null,
          fromBankName: "",
          bankTransferNO: null,
          transferValue: null,
        },
      },
    },

    validationSchema,
    validate: (values) => {
      const errors = {};

      try {
        validationSchema.validateSync(values, { abortEarly: false });
      } catch (err) {
        if (err.inner && Array.isArray(err.inner)) {
          const hasInvoiceItemsErrors = err.inner.some((error) =>
            error.path.startsWith("invoiceItems")
          );

          if (hasInvoiceItemsErrors) {
            errors.invoiceItems =
              "All the values are required, item price and quantity must be greater than 0,quantity must be integer";
          }

          const hasInvoiceSummaryErrors = err.inner.some((error) =>
            error.path.startsWith("invoiceSummary.signatureInvoice")
          );

          if (hasInvoiceSummaryErrors) {
            errors.invoiceSummary = "Signature is required";
          }

          const hasCustomerErrors = err.inner.some((error) =>
            error.path.startsWith("customer")
          );

          if (hasCustomerErrors) {
            errors.customer = "All fields in the customer section are required";
          }

          const hasPaidErrors = err.inner.some((error) =>
            error.path.startsWith("paid")
          );
          if (hasPaidErrors) {
            errors.paid = "Payment details are invalid or incomplete";
          }
        } else {
          console.error("Unexpected validation error:", err);
          errors.general = "An unexpected error occurred during validation.";
        }
      }

      return errors;
    },
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (
      values,
      { resetForm, setErrors, setTouched, setSubmitting }
    ) => {
      console.log("Submitting Invoice Data:", values);
      console.log("Clicked button:", clickedButton);

      // Handle the button click
      switch (clickedButton) {
        case "saveInHistory":
          console.log("Save in history button clicked");
          await dispatch(saveInHistory(values));
          break;
        case "saveEndDraft":
          console.log("Save End Draft button clicked");
          // await dispatch(saveEndDraft(values));
          break;
        case "saveAndPrint":
          console.log("Save & Print button clicked");
          await dispatch(saveAndPrint(values));
          navigate("/print-invoice", { state: { invoiceData: values } });
          // printComponent();
          //window.print for component and pass
          break;
        default:
          console.log("Unknown button clicked");
          break;
      }

      // Reset the form
      resetForm({
        values: formik.initialValues,
      });

      // Clear errors and touched states
      setErrors({});
      setTouched({});

      // Reset submitting state
      setSubmitting(false);

      // Reset the clicked button state
      setClickedButton(null);
    },
  });

  console.log("before and after reset Data :", formik.values);

  console.log(`selected delivery items:${formik.values.selectedDeliveries}`);
  console.dir(formik.values.selectedDeliveries);
  //section customer
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false); // Toggle modal visibility

  const updateCustomerInfo = (customer) => ({
    Mobile_NO: customer?.mobile_NO || "",
    Full_Address: customer?.full_address || "",
    City: customer?.city || "",
    VAT_NO: customer?.VAT_NO || "",
  });

  const handleChangeCustomer = (e) => {
    if (e.target.value === "create_new") {
      setIsCreatingCustomer(true); // Assuming this modal state remains local
      return;
    }
    const selectedOption = customers.find((item) => item.id == e.target.value);
    formik.setFieldValue("customer", {
      customer: selectedOption || customers[0],
      customerInfo: updateCustomerInfo(selectedOption || customers[0]),
    });
  };
  const handleChangeCustomerInfo = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue("customer", {
      ...formik.values.customer,
      customerInfo: {
        ...formik.values.customer.customerInfo,
        [name]: value,
      },
    });
  };

  useEffect(() => {
    if (formik.values.selectedDeliveries.length > 0) {
      const lastDelivery =
        formik.values.selectedDeliveries[
          formik.values.selectedDeliveries.length - 1
        ];
      const selectedOption = customers.find(
        (item) => item.id === lastDelivery.customer.id
      );
      formik.setFieldValue("customer", {
        customer: selectedOption || customers[0],
        customerInfo: updateCustomerInfo(selectedOption || customers[0]),
      });
    } else {
      formik.setFieldValue("customer", {
        customer: customers[0],
        customerInfo: updateCustomerInfo(customers[0]),
      });
    }
  }, [formik.values.selectedDeliveries]);

  //section item
  let currencies = ["NIS", "USD", "ERO"];
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  // 2. Functions to update invoiceItems using formik.setFieldValue

  const handleChangeItem = (e, invoiceItemIndex) => {
    const selectedValue = e.target.value;

    if (selectedValue === "create_new") {
      setIsCreatingItem(true);
      setSelectedItemIndex(invoiceItemIndex);
      return;
    }

    if (selectedValue === "-1") {
      // If user selects "another", enable input field
      const updatedItems = formik.values.invoiceItems.map((item, index) =>
        index === invoiceItemIndex
          ? {
              ...item,
              item: { id: -1, isAnotherItem: true, value: "" }, // Set flag for "Another Item"
              itemPrice: null,
              itemCurrency: "NIS",
            }
          : item
      );
      formik.setFieldValue("invoiceItems", updatedItems);
      return;
    }

    console.log(`Selected item ID: ${selectedValue}`);
    const selectedOption =
      items.find((item) => item.id == selectedValue) || items[0];

    const updatedItems = formik.values.invoiceItems.map((item, index) =>
      index === invoiceItemIndex
        ? {
            ...item,
            item: selectedOption,
            itemPrice: selectedOption.price,
            itemCurrency: selectedOption.currency,
            totalPriceItem:
              (selectedOption.price || 0) * (item.itemQuantity || 0),
          }
        : item
    );
    formik.setFieldValue("invoiceItems", updatedItems);
  };

  const handleChangeAnotherItem = (e, invoiceItemIndex) => {
    const newValue = e.target.value;
    const updatedItems = formik.values.invoiceItems.map((item, index) =>
      index === invoiceItemIndex
        ? {
            ...item,
            item: { id: -1, isAnotherItem: true, value: newValue },
          }
        : item
    );
    formik.setFieldValue("invoiceItems", updatedItems);
  };

  const handleChangeItemPrice = (e, invoiceItemIndex) => {
    const price = e.target.value;
    const updatedItems = formik.values.invoiceItems.map((item, index) =>
      index === invoiceItemIndex
        ? {
            ...item,
            itemPrice: parseFloat(price) || 0,
            totalPriceItem: price * (item.itemQuantity || 0),
          }
        : item
    );
    formik.setFieldValue("invoiceItems", updatedItems);
  };

  const handleChangeItemCurrency = (e, invoiceItemIndex) => {
    const currency = e.target.value;
    const updatedItems = formik.values.invoiceItems.map((item, index) =>
      index === invoiceItemIndex ? { ...item, itemCurrency: currency } : item
    );
    formik.setFieldValue("invoiceItems", updatedItems);
  };

  const handleChangeItemQuantity = (e, invoiceItemIndex) => {
    const quantity = parseFloat(e.target.value || 0);
    const updatedItems = formik.values.invoiceItems.map((item, index) =>
      index === invoiceItemIndex
        ? {
            ...item,
            itemQuantity: quantity,
            totalPriceItem: (item.itemPrice || 0) * quantity,
          }
        : item
    );
    formik.setFieldValue("invoiceItems", updatedItems);
  };

  const addItem = () => {
    const newItem = {
      item: items[0], // default first item from your items list
      itemPrice: null,
      itemCurrency: currencies[0], // default currency
      itemQuantity: null,
      totalPriceItem: null,
    };
    formik.setFieldValue("invoiceItems", [
      ...formik.values.invoiceItems,
      newItem,
    ]);
  };

  const deleteItem = (invoiceItemIndex) => {
    const updatedItems = formik.values.invoiceItems.filter(
      (_, index) => index !== invoiceItemIndex
    );
    formik.setFieldValue("invoiceItems", updatedItems);
  };

  // Optionally, update invoiceItems based on selectedDeliveries:
  useEffect(() => {
    // Example logic: if no deliveries are selected, reset invoiceItems (or remove items with delivery IDs)
    if (formik.values.selectedDeliveries.length === 0) {
      if (formik.values.invoiceItems.length === 0) {
        formik.setFieldValue("invoiceItems", [
          {
            item: items[0],
            itemPrice: null,
            itemCurrency: currencies[0],
            itemQuantity: null,
            totalPriceItem: null,
          },
        ]);
      } else {
        formik.setFieldValue(
          "invoiceItems",
          formik.values.invoiceItems.filter((item) => !item.delivery_item_id)
        );
      }
    } else {
      // Otherwise, merge items from selected deliveries with existing ones.
      let filteredItems = formik.values.invoiceItems.filter(
        (item) => item.item.id !== items[0].id // Remove default item if it exists
      );

      const selectedDeliveryIds = formik.values.selectedDeliveries.map(
        (delivery) => delivery.id
      );

      filteredItems = filteredItems.filter(
        (item) =>
          !item.delivery_item_id ||
          selectedDeliveryIds.includes(item.delivery_item_id)
      );

      const newItems = formik.values.selectedDeliveries.flatMap((delivery) =>
        delivery.items.map((item) => ({
          delivery_item_id: item.delivery_item_id,
          item: item.item,
          itemPrice: item.itemPrice,
          itemCurrency: item.itemCurrency,
          itemQuantity: item.itemQuantity,
          totalPriceItem: item.totalPriceItem,
        }))
      );

      // Avoid duplicates:
      newItems.forEach((newItem) => {
        const exists = filteredItems.some(
          (existingItem) =>
            existingItem.delivery_item_id === newItem.delivery_item_id
        );
        if (!exists) {
          filteredItems.push(newItem);
        }
      });

      formik.setFieldValue("invoiceItems", filteredItems);
    }
  }, [formik.values.selectedDeliveries]); // Runs whenever selectedDeliveries changes

  const handleIsIncludeVATChange = () => {
    formik.setFieldValue(
      "invoiceSummary.isIncludeVAT",
      !formik.values.invoiceSummary.isIncludeVAT
    );
  };

  const handleIsIncludeItemVATChange = () => {
    formik.setFieldValue(
      "invoiceSummary.isIncludeItemVAT",
      !formik.values.invoiceSummary.isIncludeItemVAT
    );
  };

  // Compute total price from invoiceItems (using formik state)
  const totalPrice = useMemo(() => {
    formik.values.invoiceSummary.totalPrice = formik.values.invoiceItems.reduce(
      (sum, item) => sum + (item.totalPriceItem || 0),
      0
    );
  }, [formik.values.invoiceItems]);

  const [clearCanvas, setClearCanvas] = useState(false);
  const [clearFile, setClearFile] = useState(false);

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
  useEffect(() => {
    const { totalPrice } = formik.values.invoiceSummary;
    let calculatedTotalPriceWithoutVAT,
      calculatedTotalVAT,
      calculatedTotalPriceWithVAT,
      calculatedTotalPriceInWords;

    if (totalPrice) {
      if (formik.values.invoiceSummary.isIncludeVAT) {
        calculatedTotalPriceWithoutVAT = totalPrice;
        calculatedTotalVAT = totalPrice * formik.values.invoiceSummary.VAT;
        calculatedTotalPriceWithVAT =
          calculatedTotalPriceWithoutVAT + calculatedTotalVAT;
        calculatedTotalPriceInWords = calculatedTotalPriceWithVAT;
      } else if (formik.values.invoiceSummary.isIncludeItemVAT) {
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

      // Optionally round values to one decimal place
      const roundVal = (val) =>
        val && val.toString().includes(".")
          ? Number(
              val.toString().split(".")[0] +
                "." +
                val.toString().split(".")[1][0]
            )
          : val;

      formik.setFieldValue("invoiceSummary", {
        ...formik.values.invoiceSummary,
        totalPrice: totalPrice,
        totalPriceWithoutVAT: roundVal(calculatedTotalPriceWithoutVAT),
        totalVAT: roundVal(calculatedTotalVAT),
        totalPriceWithVAT: roundVal(calculatedTotalPriceWithVAT),
        totalPriceInWords: convertNumberToWords(calculatedTotalPriceInWords),
      });
    } else {
      formik.setFieldValue("invoiceSummary", {
        ...formik.values.invoiceSummary,
        totalPriceWithoutVAT: null,
        totalVAT: null,
        totalPriceWithVAT: null,
        totalPriceInWords: "",
      });
    }
  }, [
    formik.values.invoiceSummary.totalPrice,
    formik.values.invoiceSummary.isIncludeVAT,
    formik.values.invoiceSummary.isIncludeItemVAT,
    formik.values.invoiceSummary.VAT,
    formik.values.invoiceItems,
  ]);

  const handlePaymentMethodsChange = (id) => {
    setPaymentMethods((prevPaymentMethods) => {
      const updated = prevPaymentMethods.map((paymentMethod) => ({
        ...paymentMethod,
        isChecked: paymentMethod.id === id,
      }));
      const selected = updated.find((method) => method.isChecked);
      formik.setFieldValue("paid.type", selected?.label || "");
      return updated;
    });
  };

  const [
    isCreatingCustomerReceiptVoucher,
    setIsCreatingCustomerReceiptVoucher,
  ] = useState(false); // Toggle modal visibility

  const handleChangeCustomerReceiptVoucher = (e) => {
    if (e.target.value === "create_new") {
      setIsCreatingCustomerReceiptVoucher(true);
      return;
    }
    const selectedOption = customers.find((item) => item.id == e.target.value);
    formik.setFieldValue(
      "paid.customerReceiptVoucher",
      selectedOption || customers[0]
    );
  };

  useEffect(() => {
    formik.values.invoiceSummary.isIncludeVAT ||
    formik.values.invoiceSummary.isIncludeItemVAT
      ? formik.setFieldValue(
          "paid.amount",
          formik.values.invoiceSummary.totalPriceWithVAT
        )
      : formik.setFieldValue(
          "paid.amount",
          formik.values.invoiceSummary.totalPriceWithoutVAT
        );
  }, [
    formik.values.invoiceSummary.totalPriceWithVAT,
    formik.values.invoiceSummary.totalPriceWithoutVAT,
  ]);

  const addCheque = () => {
    const newCheque = {
      bank_name: "",
      cheque_no: null,
      bank_no: null,
      branch_no: null,
      cheque_amount: null,
      date: new Date(),
      cheque_image: "",
    };

    formik.setFieldValue("paid.amountPaid.cheques", [
      ...formik.values.paid.amountPaid.cheques,
      newCheque,
    ]);
  };

  const deleteCheque = (index) => {
    const updatedCheques = formik.values.paid.amountPaid.cheques.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("paid.amountPaid.cheques", updatedCheques);
  };

  const totalCheque = useMemo(() => {
    return formik.values.paid.amountPaid.cheques.reduce(
      (sum, cheque) => sum + (parseFloat(cheque.cheque_amount) || 0),
      0
    );
  }, [formik.values.paid.amountPaid.cheques]);

  useEffect(() => {
    formik.setFieldValue("paid.amountPaid.totalCheque", totalCheque);
  }, [totalCheque]);

  useEffect(() => {
    if (formik.values.paid.type === "Cash & Cheque") {
      const total =
        (formik.values.paid.amountPaid.cash || 0) +
        (formik.values.paid.amountPaid.totalCheque || 0);
      formik.setFieldValue("paid.amountPaid.totalCashAndCheque", total);
    }
  }, [
    formik.values.paid.type,
    formik.values.paid.amountPaid.cash,
    formik.values.paid.amountPaid.totalCheque,
  ]);

  useEffect(() => {
    // Get the selected payment type (paymentMethods can remain as local state)
    let selectedPayment = paymentMethods.find(
      (method) => method.isChecked
    )?.label;
    let amountInWords = "";

    switch (selectedPayment) {
      case "Cash":
        amountInWords = convertNumberToWords(
          formik.values.paid.amountPaid.cash || 0
        );
        break;
      case "Cheque":
        amountInWords = convertNumberToWords(
          formik.values.paid.amountPaid.totalCheque || 0
        );
        break;
      case "Cash & Cheque":
        amountInWords = convertNumberToWords(
          formik.values.paid.amountPaid.totalCashAndCheque || 0
        );
        break;
      case "Bank Transfer":
        amountInWords = convertNumberToWords(
          formik.values.paid.amountPaid.transferValue || 0
        );
        break;
      default:
        amountInWords = "";
        break;
    }

    // Update the Formik field directly
    formik.setFieldValue("paid.totalAmountInWords", amountInWords);
  }, [
    formik.values.paid.amountPaid.cash,
    formik.values.paid.amountPaid.totalCheque,
    formik.values.paid.amountPaid.totalCashAndCheque,
    formik.values.paid.amountPaid.transferValue,
    paymentMethods, // If paymentMethods is updated externally
  ]);

  useEffect(() => {
    const updatedCustomer =
      customers.find((c) => c.id === formik.values.customer.customer.id) ||
      customers[0];
    formik.setFieldValue("paid.customerReceiptVoucher", updatedCustomer);
  }, [formik.values.customer.customer]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [messageIsPricePaid, setMessageIsPricePaid] = useState("");

  useEffect(() => {
    const { amount, amountPaid } = formik.values.paid;

    // Exit early if no payment amount is provided
    if (amount === null) {
      setMessageIsPricePaid("");
      return;
    }

    // Destructure payment method flags (with a fallback to an empty object)
    const { isChecked: isCashChecked } =
      paymentMethods.find((m) => m.label === "Cash") || {};
    const { isChecked: isChequeChecked } =
      paymentMethods.find((m) => m.label === "Cheque") || {};
    const { isChecked: isCashAndChequeChecked } =
      paymentMethods.find((m) => m.label === "Cash & Cheque") || {};
    const { isChecked: isBankTransferChecked } =
      paymentMethods.find((m) => m.label === "Bank Transfer") || {};

    let isPaid = false;

    if (isCashChecked) {
      isPaid = amount === (amountPaid.cash || 0);
    } else if (isChequeChecked) {
      isPaid = amount === (amountPaid.totalCheque || 0);
    } else if (isCashAndChequeChecked) {
      isPaid = amount === (amountPaid.totalCashAndCheque || 0);
    } else if (isBankTransferChecked) {
      isPaid = amount === (amountPaid.transferValue || 0);
    }

    setMessageIsPricePaid(
      isPaid ? "Thank you for paying" : "Please pay the full invoice amount"
    );
  }, [
    formik.values.paid.amount,
    formik.values.paid.amountPaid.cash,
    formik.values.paid.amountPaid.totalCheque,
    formik.values.paid.amountPaid.totalCashAndCheque,
    formik.values.paid.amountPaid.transferValue,
    paymentMethods,
  ]);

  return (
    <>
      <Header />
      <form
        onSubmit={formik.handleSubmit}
        className="p-10 grid gap-10 bg-gray-50"
      >
        <section className="border rounded-[20px] p-10 grid gap-10 bg-white ">
          <div className="grid-auto-fr-auto-cols  ">
            <div className="  w-80 ">
              <InvoiceLangSelect />
            </div>
            <h1 className="  font-medium text-2xl">
              Delivery {formik.values.invoiceNO}
            </h1>
            <div className="text-2xl">
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>
        </section>

        <section className="border rounded-[20px] p-10 pb-0 bg-white">
          <div className="flex-center-v-space-between mb-5">
            <h1 className="text-2xl font-semibold">Customer</h1>
            <NumberValue
              label="Customer"
              num={formik.values.customer.customer.customer_number}
            />
          </div>
          <div className="grid-5-cols-center-x gap-y-2  h-[6rem]">
            <div className="">
              <CreatableDropDown
                key={formik.values.customer.customer.id} // Add a key prop
                options={customers}
                option={formik.values.customer.customer} // Using Formik state
                handleChangeOption={handleChangeCustomer}
                valueKey="id"
                label="name"
                width="w-96"
              />
            </div>
            {Object.keys(formik.values.customer.customerInfo).map(
              (key, index) => {
                const labels = ["Mobile NO", "Full Address", "City", "VAT NO"];
                return (
                  <div key={key}>
                    <Input
                      name={key}
                      value={formik.values.customer.customerInfo[key] || ""}
                      handleChange={handleChangeCustomerInfo}
                      label={labels[index]}
                    />
                  </div>
                );
              }
            )}

            {formik.errors.customer && (
              <div className="text-red-500 col-start-1 col-span-full justify-self-start ">
                {formik.errors.customer}
              </div>
            )}
          </div>
        </section>
        <section className="border rounded-[20px] p-10 grid gap-y-10 bg-white">
          <div className="flex-center-v-space-between">
            <h1 className="text-2xl font-semibold">Item</h1>
            <button
              className="bg-green-600 text-white w-10 h-10 rounded-full flex-vx-center relative group"
              type="button"
              onClick={addItem}
            >
              <AddIcon />
              {/* Tooltip */}
              <span className="absolute -top-11 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-lg rounded-md px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Add Item
              </span>
            </button>
          </div>
          <div className="grid gap-y-5">
            {formik.values.invoiceItems.map((invoiceItem, index) => (
              <div
                key={index}
                className={`${
                  invoiceItem?.item?.isAnotherItem
                    ? "grid-8-cols-center-x"
                    : "grid-7-cols-center-x"
                } `}
              >
                <NumberValue
                  label="Item"
                  num={invoiceItem.item.item_number}
                  width="w-40"
                />
                <CreatableDropDown
                  options={items}
                  option={
                    invoiceItem.item?.isAnotherItem
                      ? { isAnotherItem: true } // Indicates "Another Item" is selected
                      : invoiceItem.item
                  }
                  // option={invoiceItem.item}
                  handleChangeOption={(e) => handleChangeItem(e, index)}
                  valueKey="id"
                  label="name"
                  width="w-48"
                  item={"anotherItem"} // Ensures "another" option is available
                />

                {invoiceItem.item?.isAnotherItem && (
                  <Input
                    key={`another_item_${index}`}
                    name="another_item"
                    value={invoiceItem.item.value || ""}
                    handleChange={(e) => handleChangeAnotherItem(e, index)}
                    label="Another item"
                    width="w-48"
                  />
                )}

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
                  className="relative group w-10 h-10 flex-vx-center"
                  onClick={() => deleteItem(index)}
                >
                  <DeleteIcon />
                  {/* Tooltip */}
                  <span className="absolute -top-11 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-lg rounded-md px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Delete Item
                  </span>
                </button>
              </div>
            ))}
          </div>

          {formik.errors.invoiceItems && (
            <div className="text-red-500">{formik.errors.invoiceItems}</div>
          )}
        </section>

        <section className="border rounded-[20px] p-10 flex gap-10 bg-white">
          <button
            type="button"
            class="w-48 px-4 py-2 bg-green-600 text-white text-xl font-semibold rounded-md hover:bg-green-500 active:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
          >
            Save
          </button>
        </section>

        <section className="border rounded-[20px] p-10 grid gap-10 bg-white">
          <h1 className="text-2xl font-semibold">Send Methods</h1>
          <div className="flex gap-10">
            <button
              type="button"
              // onClick={() => setClickedButton("saveInHistory")}
              class="w-48 px-4 py-2 bg-green-600 text-white text-xl font-semibold rounded-md hover:bg-green-500 active:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
            >
              Print A4
            </button>
            <button
              type="button"
              // onClick={() => setClickedButton("saveEndDraft")}
              class="w-48 px-4 py-2 bg-green-600 text-white text-xl font-semibold rounded-md hover:bg-green-500 active:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
            >
              Save PDF in PC
            </button>
            <button
              type="button"
              // onClick={() => setClickedButton("saveAndPrint")}
              class="w-48 px-4 py-2 bg-green-600 text-white text-xl font-semibold rounded-md hover:bg-green-500 active:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
            >
              Send To Email
            </button>
            <button
              type="button"
              // onClick={() => setClickedButton("saveAndPrint")}
              class="w-64 px-4 py-2 bg-green-600 text-white text-xl font-semibold rounded-md hover:bg-green-500 active:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
            >
              Send To WhatsApp
            </button>
          </div>
        </section>

        {(isCreatingCustomer || isCreatingCustomerReceiptVoucher) && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 border w-full max-w-[60rem]">
              <div className="flex-center-v-space-between mb-[1.6rem]">
                <h1 className="text-3xl font-bold">Create Customer</h1>
                <button
                  onClick={() => {
                    setIsCreatingCustomer(false);
                    setIsCreatingCustomerReceiptVoucher(false);
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
            <div className="bg-white rounded-lg shadow-lg py-10 px-6 border w-full max-w-[60rem]">
              <div className="flex-center-v-space-between mb-[1.6rem]">
                <h1 className="text-3xl font-bold">Create Item</h1>
                <button
                  onClick={() => {
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
      </form>
    </>
  );
};

export default DeliveryInvoices;
