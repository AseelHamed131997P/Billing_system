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

const Item = () => {
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
      name_en: "item",
      name_he: "item",
      name_ar: "item",
      price: 25,
      currency: "USD",
    },
    {
      id: 2,
      name_en: "item",
      name_he: "item",
      name_ar: "item",
      price: 23,
      currency: "USD",
    },
    {
      id: 3,
      name_en: "item",
      name_he: "item",
      name_ar: "item",
      price: 29,
      currency: "USD",
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
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: "name_en",
      header: "Name in english ",
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "name_he",
      header: "Name in hebrew",
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "name_ar",
      header: "Name in arabic",
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "currency",
      header: "Currency",
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      enableSorting: true,
    },
  ];
  return (
    <>
      <Header />
      <main className="bg-[#f1f3f6] pt-[3.2rem] pb-[3.2rem]">
        <div className="overflow-hidden bg-white rounded-[2rem] shadow-[rgba(17,17,26,0.05)_0px_1px_0px,_rgba(17,17,26,0.1)_0px_0px_8px] margin-auto max-w-[100rem]">
          <HeaderRegister />
          <section className="box-section center-x">
            <form className="register-form border p-10 rounded-[20px]">
              <div className="flex-center-v-end-x">
                <NumberValue label="Item" num="00001" />
              </div>
              <h1 className="text-2xl font-semibold">Item</h1>
              <section className=" grid-3-cols-center-v gap-10 ">
                {Object.keys(itemInfo).map((key, index) => (
                  <Input
                    key={key}
                    name={key}
                    value={itemInfo[key]}
                    handleChange={handleChangeItemInfo}
                    label={labels[index]}
                    width="w-full"
                  />
                ))}

                <DropDown
                  options={currencyType}
                  option={option}
                  setOption={setOption}
                  handleChangeOption={handleChangeOption}
                  label={"select currency"}
                />
                <div className="col-start-1 col-span-full place-self-center">
                  {" "}
                  {/* <button className="btn py-2 px-4 w-64" type="button">
                    Create Item
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
                          name_en: itemInfo.Name_In_English,
                          name_he: itemInfo.Name_In_Hebrew,
                          name_ar: itemInfo.Name_In_Arabic,
                          price: itemInfo.Price,
                          currency: option,
                        },
                      ]);

                      // Reset the customerInfo state
                      setItemInfo({
                        Name_In_Arabic: null,
                        Name_In_English: null,
                        Name_In_Hebrew: null,
                        Price: null,
                      });
                    }}
                  >
                    Create Item
                  </button>
                </div>
              </section>
            </form>
          </section>
          <section className="box-section">
            <div>
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
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Item;
