import { useDispatch } from "../hooks/index";
import { styled, mq, css } from "../ui/utils/index";
import { useSelector } from "../hooks";
import { login } from "../actions/auth";
import "./signUpWithGoogle.css";
import Invoice from "../svgs/invoice.svg";
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
const SignUpWithGoogle = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate(); // Navigate programmatically

  return (
    <main className="signup-google">
      <div className="google-box">
        <header className="box-header">
          <img
            src={Invoice}
            alt="Invoice Icon"
            class="w-9 h-9 inline-block mr-4"
          />
          <span className="header-title">Invoice System</span>
        </header>
        <section className="box-section"></section>
      </div>
    </main>
  );
};

export default SignUpWithGoogle;
