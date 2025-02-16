import { FunctionComponent } from "react";
import { useState } from "react";
import { useDispatch } from "../hooks/index";
import { useSelector } from "../hooks";
import { useLocation } from "react-router-dom";
import { Header } from "./index.js";
const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { message } = useSelector((state) => state.message);

  return (
    <div>
      <Header />
      <h1>home page</h1>
      <div>{location.state}</div>
    </div>
  );
};

export default Home;
