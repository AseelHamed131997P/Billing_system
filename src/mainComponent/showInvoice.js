import React from "react";
// import { InvoiceData } from "../types";

// interface InvoiceProps {
//   data: InvoiceData;
// }

const ShowInvoice = ({ data }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border">
      <div className="bg-[#6527BE] text-white p-6 rounded-t-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-4">INVOICE</h1>
            <div className="space-y-1 text-sm">
              <p>{data.company.phone}</p>
              <p>{data.company.email}</p>
              <p>{data.company.website}</p>
              <p>{data.company.address}</p>
              <p>{data.company.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-gray-600 font-medium mb-2">BILL TO:</h2>
            <div className="text-sm space-y-1">
              <p className="font-medium">{data.billTo.name}</p>
              <p>{data.billTo.address}</p>
              <p>{data.billTo.city}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <h2 className="text-gray-600 font-medium">INVOICE NUMBER:</h2>
              <p>{data.invoiceNumber}</p>
            </div>
            <div>
              <h2 className="text-gray-600 font-medium">ISSUED:</h2>
              <p>{data.issued}</p>
            </div>
            <div>
              <h2 className="text-gray-600 font-medium">DUE:</h2>
              <p>{data.due}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8">
          <div className="bg-[#6527BE] text-white grid grid-cols-4 p-3 rounded-t-lg">
            <div className="col-span-1">DESCRIPTION</div>
            <div className="text-center">QUANTITY</div>
            <div className="text-center">UNIT PRICE</div>
            <div className="text-right">TOTAL</div>
          </div>
          <div className="divide-y divide-gray-200">
            {data.items.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 p-3 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="col-span-1">{item.description}</div>
                <div className="text-center">{item.quantity}</div>
                <div className="text-center">${item.unitPrice}</div>
                <div className="text-right">${item.total}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="mt-8 flex justify-end">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium">SUBTOTAL:</span>
              <span>${data.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">TAX:</span>
              <span>${data.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold bg-[#6527BE] text-white p-2 rounded">
              <span>TOTAL:</span>
              <span>${data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Note to Customer */}
        {data.noteToCustomer && (
          <div className="mt-8">
            <h2 className="text-gray-600 font-medium mb-2">
              NOTE TO CUSTOMER:
            </h2>
            <p className="italic text-gray-600">{data.noteToCustomer}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ShowInvoice;
