import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./signup.scss";

import InputFild from "../iputFild/inputFild";
import { createUser } from "../../services/api";

export default function Login() {
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState(false);
  const [email, setEmail] = useState(true);
  const [phone, setPhone] = useState(true);
  const [formError, setFormError] = useState(false);

  const signBtn = useRef();

  useEffect(() => {
    if (login && password && email !== false && phone !== false) {
      signBtn.current.disabled = false;
    } else {
      signBtn.current.disabled = true;
    }
  }, [login, password, email, phone]);

  const actionSignup = async e => {
    e.preventDefault();
    const user = {
      loginName: login,
      password: password,
      email: email,
      phone: phone
    };

    const res = await createUser(user);
    if (!res.error) {
      //TODO: loader and message if OK
      setFormError("registration successful".toUpperCase());
      setTimeout(() => {
        document.location.href = "/";
      }, 2000);
    } else {
      setFormError(res.error);
    }
  };

  return (
    <>
      <h2 className="welcome-text">Sign Up</h2>
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
        <InputFild
          set={{
            type: "text",
            id: "email",
            label: "E-mail"
          }}
          value={{ val: "", set: setEmail }}
        />
        <InputFild
          set={{
            type: "text",
            id: "phone",
            label: "Phone"
          }}
          value={{ val: "+38", set: setPhone }}
        />
        <Link to="/ligin">Login</Link>
        <button ref={signBtn} onClick={actionSignup}>
          SignUp
        </button>
        {formError && <span className="form-err">{formError} </span>}
      </form>
    </>
  );
}
