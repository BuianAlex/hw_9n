import React, { useState, useEffect, useCallback, useRef } from "react";
import InputFild from "../iputFild/inputFild";
import "./login.scss";
import { Link } from "react-router-dom";

export default function Login() {
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState(false);
  const loginBtn = useRef();

  useEffect(() => {
    if (login && password) {
      loginBtn.current.disabled = false;
    } else {
      loginBtn.current.disabled = true;
    }
  }, [login, password]);

  const actionLogin = () => {};

  return (
    <>
      <h2>Welcome</h2>
      <form>
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
        <button ref={loginBtn}>Login</button>
        <Link to="/signup">SignUp</Link>
      </form>
    </>
  );
}
