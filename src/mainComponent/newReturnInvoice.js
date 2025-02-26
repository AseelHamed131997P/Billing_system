import { useState } from "react"; // React import for useState
import logo_agile from "../img/logo_agile.png"; // Import logo
import "./login.css"; // Import your CSS
import "../CSS/general.css";
import { LangSelect, Number } from "../ui/subComponent/general";
import { useTranslation } from "react-i18next";
import { Header } from "./index.js";
import { Plus } from "lucide-react";
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

const NewReturnInvoice = () => {
  const navigate = useNavigate();

  const [itemInfo, setItemInfo] = useState({
    Name_In_Arabic: null,
    Name_In_English: null,
    Name_In_Hebrew: null,
    Price: null,
  });

  const handleChangeItemInfo = (e) => {
    const { name, value } = e.target;
    setItemInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let labels = ["الاسم بالعربي", "Name In English", "שם בעברית", "Price"];
  let currencyType = ["NIS", "USD", "ERO"];
  const [option, setOption] = useState(currencyType[0]);

  const handleChangeOption = (e) => setOption(e.target.value);
  console.log(option);

  // const initialData = [
  //   { id: 1, name: "Alice", age: 25, city: "New York" },
  //   { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
  //   { id: 3, name: "Charlie", age: 35, city: "Chicago" },
  // ];

  // const [data, setData] = useState(initialData);

  const initialData = [
    {
      id: 1,
      invoice_NO: "00001",
      customer_name: "fadi",
      date: "19/02/2025",
      payment_method: "Cash",
      amount_to_be_paid: 40,
      amount_paid: 40,
    },
    {
      id: 2,
      invoice_NO: "00002",
      customer_name: "sara",
      date: "20/02/2025",
      payment_method: "Cheque",
      amount_to_be_paid: 50,
      amount_paid: 30,
    },
    {
      id: 3,
      invoice_NO: "00003",
      customer_name: "ahmad",
      date: "22/02/2025",
      payment_method: "Bank",
      amount_to_be_paid: 100,
      amount_paid: 90,
    },
  ];

  const [data, setData] = useState(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingValues, setEditingValues] = useState({});

  function RowActions({ isEditing, onEdit, onCancel, onSave, onDelete }) {
    return (
      <div className="flex gap-2">
        <>
          <button
            // onClick={onEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Rotate
          </button>
          {/* <button
            //  onClick={onDelete}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Show or Send
          </button> */}
        </>
      </div>
    );
  }
  const columns = [
    {
      header: "Actions",
      cell: ({ row }) => {
        const isEditing = editingRowId === row.original.id;
        return (
          <RowActions
            isEditing={isEditing}
            onEdit={() => {
              setEditingRowId(row.original.id);
              setEditingValues({ ...row.original });
            }}
            onCancel={() => {
              setEditingRowId(null);
              setEditingValues({});
            }}
            onSave={() => {
              const updatedData = data.map((item) =>
                item.id === editingRowId ? { ...item, ...editingValues } : item
              );
              setData(updatedData);
              setEditingRowId(null);
              setEditingValues({});
            }}
            onDelete={() => {
              setData((prevData) =>
                prevData.filter((item) => item.id !== row.original.id)
              );
            }}
          />
        );
      },
      id: "actions",
      enableSorting: false,
    },
    {
      accessorKey: "invoice_NO",
      header: "Invoice NO",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "customer_name",
      header: "Customer name",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "payment_method",
      header: "Payment method",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "amount_to_be_paid",
      header: "Amount to be paid",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "amount_paid",
      header: "Amount paid",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#f1f3f6] pt-[3.2rem] h-screen ">
        <div className="overflow-hidden bg-white rounded-[2rem] shadow-[rgba(17,17,26,0.05)_0px_1px_0px,_rgba(17,17,26,0.1)_0px_0px_8px] margin-auto max-w-[111rem]">
          <HeaderRegister />

          <section className="box-section">
            <div className="p-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {`List of invoices :`}
              </h2>

              <Table
                data={data}
                setData={setData}
                columns={columns}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                editingRowId={editingRowId}
                setEditingRowId={setEditingRowId}
                editingValues={editingValues}
                setEditingValues={setEditingValues}
                placeholder={"Search invoices..."}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default NewReturnInvoice;
