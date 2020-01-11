import React, { useState, useEffect, useRef, useContext } from "react";
import "./userCard.scss";
import InputFild from "../iputFild/inputFild";
import { createUser, updateUser } from "../../services/api";
import { UserContext } from "./../users/userContext";

export default function Card({ userData, onClose }) {
  const { user } = useContext(UserContext);
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState(false);
  const [email, setEmail] = useState(true);
  const [phone, setPhone] = useState(true);
  const [formError, setFormError] = useState(false);
  const [usergroup, setUsergroup] = useState(userData.usergroup || "user");
  // const [saveBtn, setSaveBtn] = useState(false);
  const saveBtn = useRef();

  useEffect(() => {
    if (userData._id) {
      setPassword(true);
    }
    if (
      login &&
      password &&
      email !== false &&
      phone !== false &&
      user.usergroup === "admin"
    ) {
      saveBtn.current.disabled = false;
    } else {
      saveBtn.current.disabled = true;
    }
  }, [login, password, email, phone]);

  const actionSetGroup = e => {
    setUsergroup(e.target.value);
  };

  const cardClose = e => {
    e.preventDefault();
    onClose();
  };

  const cardSave = async e => {
    e.preventDefault();
    if (userData._id) {
      const res = await updateUser(userData._id, {
        loginName: login,
        email: email,
        phone: phone,
        usergroup: usergroup
      });
      console.log("upd");
    } else {
      const res = await createUser({
        loginName: login,
        password: password,
        email: email,
        phone: phone,
        usergroup: usergroup
      });
      console.log("new");
    }
    onClose();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>{userData._id ? `UserID: ${userData._id}` : "New User"}</h2>
        <span
          className={
            userData.online ? "status status-online" : "status status-offline"
          }
        >
          {userData.online ? "onLine" : "offLine"}
        </span>
      </div>
      <form>
        <div className="form-body">
          <div className="user-photo-wr ">
            <img src="./noavatar92.png" alt="user" className="user-photo" />
            {/* <button>{photo.value ? "New photo" : "ADD photo"}</button> */}
          </div>
          <div className="text-filds">
            <InputFild
              set={{
                type: "text",
                id: "login",
                label: "Login"
              }}
              value={{ val: userData.loginName || " ", set: setLogin }}
            />
            {!userData._id && (
              <InputFild
                set={{
                  type: "password",
                  id: "password",
                  label: "Password"
                }}
                value={{ val: "", set: setPassword }}
              />
            )}
            <InputFild
              set={{
                type: "text",
                id: "email",
                label: "E-mail"
              }}
              value={{ val: userData.email || "", set: setEmail }}
            />
            <InputFild
              set={{
                type: "text",
                id: "phone",
                label: "Phone"
              }}
              value={{ val: userData.phone || "+38", set: setPhone }}
            />

            <label htmlFor="usergroup">
              Usergroup
              <p>
                <select
                  id="usergroup"
                  value={usergroup}
                  onChange={actionSetGroup}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                  <option value="superAdmin">superAdmin </option>
                </select>
              </p>
            </label>
            {userData.registrated && <p>Registrated: {userData.registrated}</p>}
            {userData.registrated && <p>Last Visit: {userData.lastVisit}</p>}
          </div>
        </div>

        <div className="form-footer">
          <button onClick={cardSave} ref={saveBtn}>
            Save
          </button>
          <button onClick={cardClose}>Close</button>
        </div>
      </form>
    </div>
  );
}
