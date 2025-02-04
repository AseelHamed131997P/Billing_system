import { useState } from "react"; // React import for useState
import "../../../CSS/general.css";

import { HeaderRegister, Input, DropDown, NumberValue } from "./index.js";

const CreateItem = () => {
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

  return (
    <form className="register-form border p-10 rounded-[20px]">
      <div className="flex-center-v-end-x">
        <NumberValue label="Item" num="001" />
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
          <button className="btn py-2 px-4 w-64" type="button">
            Create Item
          </button>
        </div>
      </section>
    </form>
  );
};

export default CreateItem;
