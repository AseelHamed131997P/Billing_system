import { FunctionComponent } from "react";
import { useState } from "react";
import { useDispatch } from "../hooks/index";
import { useSelector } from "../hooks";
import { useLocation } from "react-router-dom";
import "../index.css";
import {
  InvoiceLangSelect,
  MultiSelectInput,
} from "../ui/subComponent/general";

const Invoice = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log(`selected delivery items:${selectedOptions}`);
  return (
    <main className="p-10 border grid gap-10">
      <section className="border rounded-[20px] p-10 flex-center-v-space-between">
        <div className=" border   center-v  w-full max-w-[40rem] ">
          <label className="text-xl">Delivery Numbers: &nbsp; </label>
          <MultiSelectInput
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            placeholder="Select Your Delivery Number"
          />
        </div>
        <div className=" border w-80 ">
          <InvoiceLangSelect />
        </div>
      </section>
      <section className="border">dsdd</section>
    </main>
  );
};

export default Invoice;
