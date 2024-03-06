import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "./contexts/authContext";

const Register = () => {
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");

  const [email, setEmail] = useState("");
  const [msgSuccess, setMsgSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const inputs = { email, password };

  let msgStyle = ["form-label"];

  if (msgSuccess === false) {
    msgStyle.push(`text-danger`);
  }
  if (msgSuccess === true) {
    msgStyle.push(`text-success`);
  }
  console.log(emailErr);
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setEmailErr("");
    setPassErr("");

    axios.post(`${server}/register`, inputs).then((res) => {
      if (res.data.success) {
        setEmailErr(res.data.success);
        setMsgSuccess(true);
      } else if (res.data.errors) {
        setEmailErr(res.data.errors.email);
        setPassErr(res.data.errors.password);
        setMsgSuccess(false);
      }

      // if(res.data.errors){
      //   setEmailErr(res.data.errors.password)
      // }
    });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div class="card m-5 h-100 p-2" style={{ width: "18rem" }}>
        <form action="">
          <h4 className="my-4">Regsiteration Form</h4>
          <p className={msgStyle.join(" ")}>{emailErr}</p>

          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            onChange={emailHandler}
            className="form-control"
            type="email"
            value={email}
            name="email"
            id="email-re"
          />

          <p className="form-lable text-danger">{passErr}</p>
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            onChange={passHandler}
            className="form-control"
            type="password"
            value={password}
            name="password"
            id="pswrd-re"
          />

          <button
            onClick={submitHandler}
            className=" w-25 ms-1 mt-4 btn btn-primary"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
