import React, { useState, useEffect, useContext, useCallback } from "react";
import "./user.scss";
import { getAllUsers, deleteUser } from "../../services/api";
import { TableContext } from "./tablecontext";
import { UserContext } from "./userContext";
import Spiner from "../spinner/spinner";
import UserCard from "../userCard/userCard";
import TableRow from "./userTableRow";
import FormMessage from "../formMessage/formMessage";

export default function UserWorkBench() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  const [userCard, setUserCard] = useState({
    open: false,
    data: {}
  });
  const [usersSelected, setUsersSelected] = useState(0);
  const [spinnerState, setSpinerState] = useState(false);
  const [formMessage, setFormMessage] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setSpinerState(true);
    const apiRes = await getAllUsers();
    setSpinerState(false);
    setFormMessage(false);
    setUsersSelected(0);
    if (!apiRes.error) {
      setUserData(apiRes.result);
    } else {
      setFormMessage({
        msg: apiRes.error,
        type: 2
      });
    }
  };

  const updateTable = useCallback(() => getUsers());

  const actionCardClose = () => {
    setUserCard(state => ({ ...state, open: false, data: {} }));
  };

  const actionAddNew = () => {
    setUserCard(state => ({ ...state, open: true }));
  };

  const actionShowUser = (e, id) => {
    if (
      e.target.type !== "checkbox" &&
      !e.target.classList.contains("checkbox")
    ) {
      const user = userData.find(item => item._id === id);
      setUserCard(state => ({ ...state, open: true, data: user }));
    }
  };

  const actionSelect = id => {
    let calcSelected = 0;
    const data = userData.map(item => {
      if (item._id === id) {
        item.isSelected = !item.isSelected;
      }
      if (item.isSelected) {
        calcSelected += 1;
      }
      return item;
    });
    setUserData(data);
    setUsersSelected(calcSelected);
  };

  const actionDeleteSelected = async () => {
    setSpinerState(true);
    let toDelete = [];
    userData.forEach(item => {
      if (item.isSelected) {
        toDelete.push(item._id);
      }
    });
    const apiRes = await deleteUser(toDelete);
    //setSpinerState(false);
    if (apiRes.result) {
      //setFormMessage({ msg: "user successfully deleted", type: 0 });
      getUsers();
      // setTimeout(() => {
      //   setFormMessage(false);
      // }, 5000);
    } else {
      setFormMessage({ msg: apiRes.error, type: 2 });
    }
  };

  return (
    <>
      {userCard.open && (
        <UserCard
          onClose={actionCardClose}
          userData={userCard.data}
          updateTable={updateTable}
        />
      )}
      <h2 className="section-header">Users</h2>
      {user.usergroup === "admin" && (
        <div className="action-bar">
          <button onClick={actionAddNew}>ADD User</button>
          {/* <input type="text" placeholder="Find user" />
          <button>Find</button> */}
          <button onClick={actionDeleteSelected} disabled={usersSelected === 0}>
            Delete
          </button>
          {/* 
          <button>Filter</button> */}
        </div>
      )}
      <TableContext.Provider value={{ actionSelect, actionShowUser }}>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th className="checkbox">
                  <input type="checkbox" name="select" disabled />
                </th>
                {/* <th>Name</th> */}
                <th>Login Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Usergroup</th>
                <th>Last Visit</th>
                <th>Registrated</th>
                {/* <th>ID</th> */}
              </tr>
            </thead>
            <tbody>
              {userData
                ? userData.map(item => (
                    <TableRow key={item._id} userData={item} />
                  ))
                : false}
            </tbody>
            <tfoot>
              <tr>{/* <td>/td>
              <td></td> */}</tr>
            </tfoot>
          </table>
          {spinnerState && <Spiner />}
          {formMessage && (
            <FormMessage messange={formMessage.msg} type={formMessage.type} />
          )}
          <div className="selected">Selected: {usersSelected}</div>
        </div>
      </TableContext.Provider>
    </>
  );
}
