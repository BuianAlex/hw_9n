import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import InputFild from "../iputFild/inputFild";
import { loginUser } from "../../services/api";

export default function Login() {
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState(false);
  const [formError, setFormError] = useState(false);
  const loginBtn = useRef();

  useEffect(() => {
    if (login && password) {
      loginBtn.current.disabled = false;
    } else {
      loginBtn.current.disabled = true;
    }
  }, [login, password]);

  const actionLogin = async e => {
    e.preventDefault();
    const servRes = await loginUser({ loginName: login, password: password });
    if (servRes.result) {
      document.location.href = "/";
    } else {
      setFormError(servRes.error);
    }
  };

  return (
    <>
      <h2 className="welcome-text">Welcome</h2>
      <form className="login-form">
        <InputFild
          set={{
            type: "text",
            id: "login",
            label: "Login"
          }}
          value={{ val: login, set: setLogin }}
        />
        <InputFild
          set={{
            type: "password",
            id: "password",
            label: "Password"
          }}
          value={{ val: password, set: setPassword }}
        />
        <button ref={loginBtn} onClick={actionLogin}>
          Login
        </button>
        <Link to="/signup">SignUp</Link>
        <span className="form-err">{formError} </span>
      </form>
    </>
  );
}
