import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import InputFild from "../iputFild/inputFild";
import Spiner from "../spinner/spinner";
import FormMessage from "../formMessage/formMessage";
import { loginUser } from "../../services/api";

export default function Login() {
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState(false);
  const [formMessage, setFormMessage] = useState(false);
  const [spinnerState, setSpinerState] = useState(false);
  const [saveBtn, setSaveBtn] = useState(false);
  const loginBtn = useRef();

  useEffect(() => {
    if (login && password) {
      setSaveBtn(true);
    } else {
      setSaveBtn(false);
    }
  }, [login, password]);

  const actionLogin = async e => {
    e.preventDefault();
    setSpinerState(true);
    const servRes = await loginUser({ loginName: login, password: password });
    setSpinerState(false);
    if (servRes.result) {
      document.location.href = "/";
    } else {
      setFormMessage({ msg: servRes.error, type: 2 });
    }
  };

  return (
    <>
      <h2 className="welcome-text">Welcome</h2>
      <form className="mui-panel login-form">
        <InputFild
          options={{
            type: "text",
            id: "login",
            label: "Login:",
            value: "",
            disabled: false
          }}
          onValid={setLogin}
        />
        <InputFild
          options={{
            type: "password",
            id: "password",
            label: "Password:",
            value: ""
          }}
          onValid={setPassword}
        />
        {spinnerState && <Spiner />}
        {formMessage && (
          <FormMessage messange={formMessage.msg} type={formMessage.type} />
        )}
        <div className="form-bottom">
          <button
            ref={loginBtn}
            onClick={actionLogin}
            disabled={!saveBtn}
            className="mui-btn   mui-btn--raised mui-btn--primary"
          >
            Login
          </button>
          <Link to="/signup" className="mui-btn mui-btn--flat">
            SignUp
          </Link>
        </div>
      </form>
    </>
  );
}
