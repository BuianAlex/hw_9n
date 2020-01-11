import React, { useState, useEffect, useContext } from "react";
import "./user.scss";
import { getAllUsers, deleteUser } from "../../services/api";
import { TableContext } from "./tablecontext";
import { UserContext } from "./userContext";

import UserCard from "./../userCard/userCard";
import TableRow from "./userTableRow";

export default function UserWorkBench() {
  const { user } = useContext(UserContext);
  console.log(user);

  const [userData, setUserData] = useState([]);
  const [errrors, setErrrors] = useState([]);
  const [userCard, setUserCard] = useState({ open: false, data: {} });
  const [usersSelected, setUsersSelected] = useState(0);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const dbRes = await getAllUsers();
    setErrrors(dbRes.error);
    setUserData(dbRes.result);
  };

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
    console.log(id);

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
    let toDelete = [];
    userData.forEach(item => {
      if (item.isSelected) {
        toDelete.push(item._id);
      }
    });
    const res = await deleteUser(toDelete);
  };

  return (
    <>
      {userCard.open && (
        <UserCard onClose={actionCardClose} userData={userCard.data} />
      )}
      <h2>Users</h2>
      {user.usergroup === "admin" && (
        <div className="header">
          <button onClick={actionAddNew}>ADD User</button>
          <input type="text" placeholder="Find user" />
          <button>Find</button>
          <button onClick={actionDeleteSelected} disabled={usersSelected === 0}>
            Delete
          </button>

          <button>Filter</button>
        </div>
      )}

      {userData ? (
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

            <div className="selected">Selected: {usersSelected}</div>
          </div>
        </TableContext.Provider>
      ) : (
        <div className="error">{errrors}</div>
      )}
    </>
  );
}
