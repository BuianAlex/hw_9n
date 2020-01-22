import React, { useState, useEffect, useContext } from "react";
import "./userCard.scss";
import InputFild from "../iputFild/inputFild";
import SelectFild from "../selectFild/selectFild";
import Spiner from "../spinner/spinner";
import FormMessage from "../formMessage/formMessage";
import { createUser, updateUser } from "../../services/api";
import { UserContext } from "../usersPage/userContext";
import * as moment from "moment";

export default function Card({ userData, onClose, updateTable }) {
  const { user } = useContext(UserContext);
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState(false);
  const [email, setEmail] = useState(true);
  const [phone, setPhone] = useState(true);
  const [formMessage, setFormMessage] = useState(false);
  const [usergroup, setUsergroup] = useState(userData.usergroup || "user");
  const [saveBtn, setSaveBtn] = useState(false);
  const [spinnerState, setSpinerState] = useState(false);

  useEffect(() => {
    if (userData.userId) {
      setPassword(true);
    }
    if (
      login &&
      password &&
      email !== false &&
      phone !== false &&
      user.usergroup === "admin"
    ) {
      if (
        userData.loginName !== login ||
        userData.email !== email ||
        userData.phone !== phone ||
        userData.usergroup !== usergroup
      ) {
        setSaveBtn(true);
      }
    } else {
      setSaveBtn(false);
    }
  }, [login, password, email, phone, usergroup]);

  const cardClose = e => {
    e.preventDefault();
    onClose();
  };

  const cardSave = async e => {
    e.preventDefault();
    setFormMessage(false);
    setSpinerState(true);
    if (userData.userId) {
      const apiRes = await updateUser(userData.userId, {
        loginName: login,
        email: email,
        phone: phone,
        usergroup: usergroup,
        photo: "user.svg"
      });
      setSpinerState(false);
      if (apiRes.result) {
        setFormMessage({ msg: "user successfully updated", type: 0 });
        updateTable();
      } else {
        setFormMessage({ msg: apiRes.error, type: 2 });
      }
    } else {
      const apiRes = await createUser({
        loginName: login,
        password: password,
        email: email,
        phone: phone,
        usergroup: usergroup
      });
      setSpinerState(false);
      if (!apiRes.error) {
        setFormMessage({ msg: "New user was created successfully", type: 0 });
        updateTable();
      } else {
        setFormMessage({ msg: apiRes.error, type: 2 });
      }
    }
    //onClose();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>{userData.userId ? `UserID: ${userData.userId}` : "New User"}</h2>
        <span
          className={
            userData.online ? "status status-online" : "status status-offline"
          }
        >
          {userData.online ? "onLine" : "offLine"}
        </span>
      </div>
      <form className="mui-form">
        <div className="form-body">
          <div className="user-photo-wr ">
            <img
              src={userData.photo || "./user.svg"}
              alt="user"
              className="user-photo"
            />
            {/* <button>{photo.value ? "New photo" : "ADD photo"}</button> */}
          </div>
          <div className="text-filds">
            <InputFild
              options={{
                type: "text",
                id: "login",
                label: "Login:",
                value: userData.loginName,
                disabled: user.usergroup !== process.env.REACT_APP_USER_ADMIN
              }}
              onValid={setLogin}
            />
            {!userData.userId && (
              <InputFild
                options={{
                  type: "password",
                  id: "password",
                  label: "Password:",
                  value: "",
                  disabled: user.usergroup !== process.env.REACT_APP_USER_ADMIN
                }}
                onValid={setPassword}
              />
            )}
            <InputFild
              options={{
                type: "text",
                id: "email",
                label: "E-mail:",
                value: userData.email,
                disabled: user.usergroup !== process.env.REACT_APP_USER_ADMIN
              }}
              onValid={setEmail}
            />
            <InputFild
              options={{
                type: "text",
                id: "phone",
                label: "Phone:",
                value: userData.phone || "+38",
                disabled: user.usergroup !== process.env.REACT_APP_USER_ADMIN
              }}
              onValid={setPhone}
            />
            <SelectFild
              options={{
                id: "usergroup",
                value: usergroup,
                label: "Usergroup:",
                disabled: user.usergroup !== process.env.REACT_APP_USER_ADMIN,
                selectors: [
                  { val: "user", name: "User" },
                  { val: "admin", name: "Admin" },
                  { val: "superAdmin", name: "SuperAdmin" }
                ]
              }}
              onChange={setUsergroup}
            />

            {userData.registrated && (
              <p>
                Registrated:{" "}
                {moment(userData.registrated).format("MMM DD hh:mm:ss")}
              </p>
            )}
            {userData.registrated && (
              <p>
                Last Visit:{" "}
                {moment(userData.lastVisit).format("MMM DD hh:mm:ss")}
              </p>
            )}
          </div>
        </div>
        <div className="form-footer">
          {spinnerState && <Spiner />}
          {formMessage && (
            <FormMessage messange={formMessage.msg} type={formMessage.type} />
          )}
          {saveBtn && (
            <button
              onClick={cardSave}
              className="mui-btn  mui-btn--raised mui-btn--primary"
            >
              Save
            </button>
          )}
          <button onClick={cardClose} className="mui-btn mui-btn--raised">
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
