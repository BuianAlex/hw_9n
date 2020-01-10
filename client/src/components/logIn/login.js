import React, { useState, useEffect, useCallback, useRef } from "react";
import InputFild from "../iputFild/inputFild";
import "./login.scss";
import { Link, Redirect, Switch } from "react-router-dom";
import { loginUser } from "../../services/api";
import { removeLocalUser } from "../../services/localStorage";

export default function Login() {
  //removeLocalUser();
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
    if (servRes === "ok") {
      document.location.href = "/";
    } else {
      setFormError(servRes);
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
          cb={setLogin}
        />
        <InputFild
          set={{
            type: "password",
            id: "password",
            label: "Password"
          }}
          cb={setPassword}
        />
        <button ref={loginBtn} onClick={actionLogin}>
          Login
        </button>
        <Link to="/signup">SignUp</Link>
        <span className="form-err">{formError} </span>
      </form>
      {/* <Switch>{isLoginOK && <Redirect to="/" />}</Switch> */}
    </>
  );
}
