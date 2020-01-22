import React, { useState, useEffect } from "react";
import Validator from "../../services/validator";
import "./inputFild.scss";

export default function InputFild({ options, onValid }) {
  const [fild, setFild] = useState(options.value || "");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const fildChange = e => {
    let inputValue = e.target.value.trim();
    const testValue = new Validator(inputValue);
    let isSpecial = testValue.noSpeсialChar();
    if (isSpecial) {
      setIsBlur(true);
      setErrorMessage(`Not allowed special characters ( -/^$*?()|[]{}\\ )`);
    } else {
      switch (e.target.id) {
        case "login":
          setErrorMessage(true);
          if (!testValue.maxLength(50)) {
            setErrorMessage("Login is too long!");
          } else if (!testValue.minLength(3)) {
            setErrorMessage("Login is too short!");
          } else {
            setErrorMessage(false);
          }
          break;

        case "password":
          setErrorMessage(true);
          switch (testValue.testPassword()) {
            case 0:
              setErrorMessage(
                "Password must have at least 6 characters and include numbers and letters"
              );
              break;
            default:
              setErrorMessage(false);
              break;
          }
          break;

        case "email":
          setErrorMessage(false);
          if (!testValue.isEmail() && inputValue.length > 0) {
            setErrorMessage("Email Address not valid");
          }
          break;

        case "phone":
          setErrorMessage(false);
          if (inputValue.length < 4) {
            inputValue = "+38";
            setErrorMessage(false);
          } else {
            if (!/(^\+38\d+$)/.test(inputValue) && inputValue.length > 3) {
              setErrorMessage("Phone number is not valid");
              inputValue = fild;
            }
            if (inputValue.length > 13) {
              inputValue = fild;
            }
            if (inputValue.length < 13 && !testValue.isPhoneNumber()) {
              setErrorMessage("Phone number is not valid");
            }
          }
          break;
        default:
          break;
      }
      setFild(inputValue);
    }
  };

  useEffect(() => {
    if (!errorMessage) {
      onValid(fild);
    } else {
      onValid(false);
    }
  }, [errorMessage, fild, onValid]);

  const fildBlur = e => {
    setIsBlur(true);
  };

  return (
    <div className="mui-textfield">
      <input
        type={options.type}
        id={options.id}
        value={fild}
        onChange={fildChange}
        onBlur={fildBlur}
        disabled={options.disabled}
      />
      <label htmlFor={options.id}>{options.label}</label>
      <span className="errors">{isBlur && errorMessage}</span>
    </div>
  );
}
