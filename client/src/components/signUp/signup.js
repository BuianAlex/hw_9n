import React, { useState, useEffect, useCallback, useRef } from "react";
import InputFild from "../iputFild/inputFild";
import "./signup.scss";
import { Link } from "react-router-dom";

export default function Login() {
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState(false);
  const [email, setEmail] = useState(true);
  const [phone, setPhone] = useState(true);

  const signBtn = useRef();

  useEffect(() => {
    if (login && password && email !== false && phone !== false) {
      signBtn.current.disabled = false;
    } else {
      signBtn.current.disabled = true;
    }
  }, [login, password, email, phone]);

  const actionLogin = () => {};

  return (
    <>
      <h2>Sign Up</h2>
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
        <InputFild
          set={{
            type: "text",
            id: "email",
            label: "E-mail"
          }}
          cb={setEmail}
        />
        <InputFild
          set={{
            type: "text",
            id: "phone",
            label: "Phone",
            value: "+38"
          }}
          cb={setPhone}
        />
        <Link to="/ligin">Login</Link>
        <button ref={signBtn}>SignUp</button>
      </form>
    </>
  );
}
