import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { ShowInvoice } from "./index";
const PrintableComponent = () => {
  const location = useLocation();
  const { invoiceData } = location.state || {}; // Access passed state

  const sampleInvoiceData = {
    invoiceNumber: "0027",
    billTo: {
      name: "Margarita Perez",
      address: "123 Anywhere St.",
      city: "Any City, ST 12345",
    },
    company: {
      phone: "+123-456-7890",
      email: "hello@reallygreatsite.com",
      website: "reallygreatsite.com",
      address: "123 Anywhere St.",
      city: "Any City, ST 12345",
    },
    issued: "October 17, 2025",
    due: "October 18, 2025",
    items: [
      {
        description: "Social Media Account One-time Set up",
        quantity: 2,
        unitPrice: 500,
        total: 1000,
      },
      {
        description: "Social Media Monthly Management",
        quantity: 2,
        unitPrice: 700,
        total: 1400,
      },
      {
        description: "Social Media Graphics",
        quantity: 30,
        unitPrice: 20,
        total: 600,
      },
      {
        description: "Social Media Monthly Engagement",
        quantity: 2,
        unitPrice: 700,
        total: 1400,
      },
      {
        description: "Social Media Monthly Report",
        quantity: 2,
        unitPrice: 500,
        total: 1000,
      },
    ],
    subtotal: 5400.0,
    tax: 200.0,
    total: 5600.0,
    noteToCustomer: "Thank you Margarita!",
  };

  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML; // Get invoice content

    // Create a hidden iframe for printing
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
          <style>
            @media print {
              @page { margin: 0; }
              body { margin: 0; padding: 20px; background: white; color: black; }
              .invoice-container { width: 90%; margin: 0 auto; border: 1px solid black;  }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            ${printContent}
          </div>
        </body>
      </html>
    `);
    doc.close();

    // Wait for the iframe to load before printing
    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 1000); // Cleanup after printing
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 print:bg-white">
      {/* Invoice Section (Only this will be printed) */}
      <div
        ref={printRef}
        className="w-full max-w-2xl bg-white shadow-md border border-gray-300 print:shadow-none print:border-none"
      >
        <ShowInvoice data={sampleInvoiceData} />

        {/* <h1 className="text-2xl font-bold text-center mb-4">Invoice Details</h1>
        <p className="text-lg">
          <span className="font-semibold">Invoice Number:</span>{" "}
          {invoiceData?.invoiceNO}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Customer Name:</span>{" "}
          {invoiceData?.customer?.customer?.name}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Total Amount:</span>{" "}
          {invoiceData?.paid?.amount}
        </p> */}
      </div>

      {/* Print Button (Hidden when printing) */}
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-500 active:bg-blue-700 focus:outline-none transition duration-300 ease-in-out print:hidden"
        onClick={handlePrint}
      >
        Print Invoice
      </button>
    </div>
  );
};

export default PrintableComponent;
