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

  // const initialData = [
  //   { id: 1, name: "Alice", age: 25, city: "New York" },
  //   { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
  //   { id: 3, name: "Charlie", age: 35, city: "Chicago" },
  // ];
  const initialData = [
    {
      id: 1,
      name_en: "fadi",
      name_he: "Agile",
      name_ar: "Alice",
      email: "a.hamed123@gmail.com",
      mobile_no: "0567854321",
      city: "New York",
      full_address: "betunia_alhatu",
      VAT_NO: 123343333,
      ID_NO: 998764537,
    },
    {
      id: 2,
      name_en: "Agile",
      name_he: "Agile",
      name_ar: "Alice",
      email: "a.hamed123@gmail.com",
      mobile_no: "0567854321",
      city: "Los Angeles",
      full_address: "betunia_alhatu",
      VAT_NO: 123343333,
      ID_NO: 998764537,
    },
    {
      id: 3,
      name_en: "Agile",
      name_he: "Agile",
      name_ar: "Alice",
      email: "a.hamed123@gmail.com",
      mobile_no: "0567854321",
      city: "Chicago",
      full_address: "betunia_alhatu",
      VAT_NO: 123343333,
      ID_NO: 998764537,
    },
  ];

  const [data, setData] = useState(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingValues, setEditingValues] = useState({});

  function RowActions({ isEditing, onEdit, onCancel, onSave, onDelete }) {
    return (
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={onSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onEdit}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
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
      accessorKey: "name_en",
      header: "Name in english ",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "name_he",
      header: "Name in hebrew",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "name_ar",
      header: "Name in arabic",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "mobile_no",
      header: "Mobile NO",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "city",
      header: "City",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "full_address",
      header: "Full address",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
    {
      accessorKey: "VAT_NO",
      header: "VAT NO",
      cell: (info) => info.getValue(),

      enableSorting: true,
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#f1f3f6] pt-[3.2rem] pb-[3.2rem]">
        <div className="overflow-hidden bg-white rounded-[2rem] shadow-[rgba(17,17,26,0.05)_0px_1px_0px,_rgba(17,17,26,0.1)_0px_0px_8px] margin-auto max-w-[110rem]">
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
                <NumberValue label="Customer" num="00001" />
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
                  {/* <button className="btn py-2 px-4 w-64" type="button">
                    Create Customer
                  </button> */}
                  <button
                    className="btn py-2 px-4 w-64"
                    type="button"
                    onClick={(e) => {
                      // Update the data state
                      setData((prevData) => [
                        ...prevData,
                        {
                          id: prevData.length + 1,
                          name_en: customerInfo.Name_In_English,
                          name_he: customerInfo.Name_In_Hebrew,
                          name_ar: customerInfo.Name_In_Arabic,
                          email: customerInfo.Email,
                          mobile_no: customerInfo.Mobile_NO,
                          city: customerInfo.City,
                          full_address: customerInfo.Full_Address,
                          VAT_NO: customerInfo.VAT_NO,
                        },
                      ]);

                      // Reset the customerInfo state
                      setCustomerInfo({
                        Name_In_Arabic: "",
                        Name_In_English: "",
                        Name_In_Hebrew: "",
                        Email: "",
                        Mobile_NO: "",
                        Full_Address: "",
                        City: "",
                        VAT_NO: "",
                      });
                    }}
                  >
                    Create Customer
                  </button>
                </div>
              </section>
            </form>
          </section>
          <section className="box-section">
            <div className="p-10">
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
                placeholder={"Search customers..."}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Customer;
