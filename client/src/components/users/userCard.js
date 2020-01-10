import React, { useState, useEffect } from "react";
import "./userCard.scss";
import Validator from "../../services/validator";
import { createUser, updateUser } from "../../services/api";

export default function Card(props) {
  const [nameFild, setUserNameFild] = useState({
    value: props.userData.name || ""
  });

  const [loginFild, setUserLoginFild] = useState({
    value: props.userData.loginName || "",
    error: true
  });

  const [passFild, setUserPass] = useState({
    value: props.userData.password || "",
    error: true
  });

  const [phoneFild, setUserPhoneFild] = useState({
    value: props.userData.phone || "+38"
  });

  const [emailFild, setUserEmailFild] = useState({
    value: props.userData.email || ""
  });

  const [usergroupSelect, setUsergroupSelect] = useState(
    props.userData.usergroup || "user"
  );

  const [photo, setPhoto] = useState({
    value: props.userData.photo
  });

  const [saveBtnstate, setSaveBtnstate] = useState(true);

  useEffect(() => {
    if (
      !nameFild.error &&
      !loginFild.error &&
      !passFild.error &&
      !emailFild.error &&
      !phoneFild.error
    ) {
      setSaveBtnstate(false);
    } else {
      setSaveBtnstate(true);
    }
  }, [
    nameFild.error,
    loginFild.error,
    passFild.error,
    emailFild.error,
    phoneFild.error
  ]);
  const cardClose = e => {
    e.preventDefault();
    props.onClose();
  };

  const cardSave = async e => {
    e.preventDefault();
    const user = {
      name: nameFild.value,
      loginName: loginFild.value,
      password: passFild.value,
      email: emailFild.value,
      phone: phoneFild.value,
      photo: "",
      usergroup: usergroupSelect
    };
    if (props.userData._id) {
      const res = await updateUser(props.userData._id, user);
      console.log("upd");
    } else {
      const res = await createUser(user);
      console.log("new");
    }

    props.onClose();
  };

  const fildChange = e => {
    const testStr = new Validator(e.target.value);
    let errorMessage = "";
    let isSpecial = false;
    const noSpeсialChar = testStr.noSpeсialChar();
    if (testStr.noSpeсialChar()) {
      errorMessage = `Not allowed special characters -/^$*+?()|[]{}\\`;
      isSpecial = true;
    }
    if (e.target.id === "name") {
      if (!testStr.maxLength(50)) {
        errorMessage = "Name is too long!";
      }
      if (!testStr.minLength(3)) {
        errorMessage = "Name is too short!";
      }
      setUserNameFild({
        ...nameFild,
        value: e.target.value,
        error: errorMessage
      });
    }

    if (e.target.id === "login") {
      if (!isSpecial) {
        errorMessage = false;
        if (!testStr.maxLength(50)) {
          errorMessage = "Name is too long!";
        }
        if (!testStr.minLength(3)) {
          errorMessage = "Name is too short!";
        }
      }

      setUserLoginFild({
        ...loginFild,
        value: e.target.value,
        error: errorMessage
      });
    }

    if (e.target.id === "pass") {
      if (!isSpecial) {
        switch (testStr.testPassword()) {
          case 0:
            errorMessage =
              "Password must have at least 6 characters and include numbers and letters";
            break;
          default:
            errorMessage = false;
            break;
        }
      }
      setUserPass({
        ...passFild,
        value: e.target.value,
        error: errorMessage
      });
    }

    if (e.target.id === "email") {
      if (!testStr.isEmail()) {
        errorMessage = "Email Address not valid";
      }
      setUserEmailFild({
        ...emailFild,
        value: e.target.value,
        error: errorMessage
      });
    }

    if (e.target.id === "phone") {
      errorMessage = "";
      let isNumber = true;
      let strLength = true;
      if (!/(^\+\d+$)/.test(e.target.value)) {
        errorMessage = "Phone number is not valid";
        isNumber = false;
      }
      if (e.target.value.length > 13) {
        // errorMessage = "Phone number is not valid";
        strLength = false;
        console.log(phoneFild.value.length);
      }
      setUserPhoneFild({
        ...phoneFild,
        value: isNumber && strLength ? e.target.value : phoneFild.value,
        error: errorMessage
      });
    }

    if (e.target.id === "usergroup") {
      setUsergroupSelect(e.target.value);
    }
  };

  const fildBlur = e => {
    if (e.target.id === "name") {
      setUserNameFild({
        ...nameFild,
        isBlur: true
      });
    }
    if (e.target.id === "login") {
      setUserLoginFild({
        ...loginFild,
        isBlur: true
      });
    }

    if (e.target.id === "pass") {
      setUserPass({
        ...passFild,
        isBlur: true
      });
    }
    if (e.target.id === "email") {
      setUserEmailFild({
        ...emailFild,
        isBlur: true
      });
    }
    if (e.target.id === "phone") {
      setUserPhoneFild({
        ...phoneFild,
        isBlur: true
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>
          {props.userData._id ? `UserID: ${props.userData._id}` : "New User"}
        </h2>
        <span
          className={
            props.userData.online
              ? "status status-online"
              : "status status-offline"
          }
        >
          {props.userData.online ? "onLine" : "offLine"}
        </span>
      </div>
      <form>
        <div className="form-body">
          <div className="user-photo-wr ">
            <img
              src={photo.value ? photo.value : "./noavatar92.png"}
              alt="user photo"
              className="user-photo"
            />
            {/* <button>{photo.value ? "New photo" : "ADD photo"}</button> */}
          </div>
          <div className="text-filds">
            <div className="fild">
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  id="name"
                  value={nameFild.value}
                  onChange={fildChange}
                  onBlur={fildBlur}
                />
              </label>
              <span className="errors">
                {nameFild.isBlur && nameFild.error}
              </span>
            </div>

            <div className="fild">
              <label htmlFor="login">
                Login
                <input
                  type="text"
                  id="login"
                  value={loginFild.value}
                  onChange={fildChange}
                  onBlur={fildBlur}
                />
              </label>
              <span className="errors">
                {loginFild.isBlur && loginFild.error}
              </span>
            </div>

            <div className="fild">
              <label htmlFor="pass">
                Password
                <input
                  type="text"
                  id="pass"
                  value={passFild.value}
                  onChange={fildChange}
                  onBlur={fildBlur}
                />
              </label>
              <span className="errors">
                {passFild.isBlur && passFild.error}
              </span>
            </div>

            <div className="fild">
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  id="email"
                  value={emailFild.value}
                  onChange={fildChange}
                  onBlur={fildBlur}
                />
              </label>
              <span className="errors">
                {emailFild.isBlur && emailFild.error}
              </span>
            </div>

            <div className="fild">
              <label htmlFor="phone">
                Phone
                <input
                  type="text"
                  id="phone"
                  value={phoneFild.value}
                  onChange={fildChange}
                />
              </label>
              <span className="errors">{phoneFild.error}</span>
            </div>

            <label htmlFor="usergroup">
              Usergroup
              <p>
                <select
                  id="usergroup"
                  value={usergroupSelect}
                  onChange={fildChange}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                  <option value="superAdmin">superAdmin </option>
                </select>
              </p>
            </label>
            {props.userData.registrated && (
              <p>Registrated: {props.userData.registrated}</p>
            )}
            {props.userData.registrated && (
              <p>Last Visit: {props.userData.lastVisit}</p>
            )}
          </div>
        </div>

        <div className="form-footer">
          <button onClick={cardSave} disabled={saveBtnstate}>
            Save
          </button>
          <button onClick={cardClose}>Close</button>
        </div>
      </form>
    </div>
  );
}
