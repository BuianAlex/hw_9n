import React, { useState, useEffect, useCallback, useRef } from "react";
import InputFild from "../iputFild/inputFild";
import "./signup.scss";
import { Link } from "react-router-dom";
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
    setFormError(res.error);
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
        <button ref={signBtn} onClick={actionSignup}>
          SignUp
        </button>
        {formError && <span className="form-err">{formError} </span>}
      </form>
    </>
  );
}
