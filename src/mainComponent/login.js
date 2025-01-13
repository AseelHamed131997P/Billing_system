import { useDispatch } from "../hooks/index";
import { styled, mq, css } from "../ui/utils/index";
import { useSelector } from "../hooks";
import { login } from "../actions/auth";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

const Sky = styled.div`
  color: red;
`;
const Login = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate(); // Navigate programmatically

  return (
    <div>
      <h1 color="primary">aseeel</h1>
      <div>aseel hamed</div>
      <div onClick={() => dispatch(login({ PIN: "aseeltest" }))}>aseel</div>
      <div>{message}</div>
      <button>but</button>
      {/* <button onClick={() => push("/home", { user: "JohnDoe" })}>
        Go to Home
      </button> */}

      <button onClick={() => navigate("/home", { state: "value" })}>
        Go to Home
      </button>
      <Sky style={{ fontSize: "10px" }}>soso</Sky>
    </div>
  );
};

export default Login;
