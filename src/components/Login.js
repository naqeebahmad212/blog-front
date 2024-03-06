import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, server } from "./contexts/authContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [msgSuccess, setMsgSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const data = { email, password };
  const navigate = useNavigate();

  const submitHandler = (e) => {
    setMsgSuccess("");
    e.preventDefault();
    axios
      .post(`${server}/login`, data, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(true);
          navigate("/");
        } else {
          setIsLoggedIn(false);
          setMsgSuccess("Invalid Credentials");
        }
      })
      .catch((err) => {
        setMsgSuccess("Login failed");
      });
  };

  useEffect(() => {
    axios
      .get("https://blog-back-bzo6.vercel.app/check-user", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.loggedIn === true) {
          navigate("/");
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="container d-flex justify-content-center">
      <div className="card m-5 h-100 p-2" style={{ width: "18rem" }}>
        <h2 className="text-center">Login Form</h2>
        <form onSubmit={submitHandler}>
          <p className="form-label text-center text-danger">{msgSuccess}</p>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            type="email"
            value={email}
            name="email"
            id="email-log"
          />

          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            type="password"
            value={password}
            name="password"
            id="pswrd-log"
          />

          <button className=" w-25 ms-1 mt-4 btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
