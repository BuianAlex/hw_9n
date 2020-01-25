import React, { useState, useEffect, useContext, useCallback } from "react";
import "./user.scss";
import { getAllUsers, deleteUser, sendCsv } from "../../services/api";
import { TableContext } from "./tablecontext";
import { UserContext } from "./userContext";
import Spiner from "../spinner/spinner";
import UserCard from "../userCard/userCard";
import Popup from "../popup/popup";
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
  const [selectAll, setSelectAll] = useState(false);
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

  // const updateTable = useCallback(() => getUsers());

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
      const user = userData.find(item => item.userId === id);
      setUserCard(state => ({ ...state, open: true, data: user }));
    }
  };

  const actionSelect = id => {
    let calcSelected = 0;
    const data = userData.map(item => {
      if (item.userId === id || !id) {
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
        toDelete.push(item.userId);
      }
    });
    const apiRes = await deleteUser(toDelete);
    setSpinerState(false);
    if (apiRes.result) {
      getUsers();
    } else {
      setFormMessage({ msg: apiRes.error, type: 2 });
    }
  };

  const actionSendCsv = async e => {
    e.preventDefault();
    const apiRes = await sendCsv(e.target.files);
    console.log(apiRes);
  };

  return (
    <>
      {userCard.open && (
        <UserCard
          onClose={actionCardClose}
          userData={userCard.data}
          updateTable={getUsers}
        />
      )}
      <Popup />
      <h2 className="section-header">Users</h2>
      {user.usergroup === "admin" && (
        <div className="action-bar">
          <button
            onClick={actionAddNew}
            className="mui-btn mui-btn--small mui-btn--raised"
          >
            ADD User
          </button>
          <div className="upload-btn-wrapper">
            <button className="mui-btn mui-btn--raised">ADD from csv</button>
            <input type="file" name="myfile" onChange={actionSendCsv} />
          </div>
          {/* <input type="text" placeholder="Find user" />
          <button>Find</button> */}
          <button
            onClick={actionDeleteSelected}
            disabled={usersSelected === 0}
            className="mui-btn mui-btn--small mui-btn--raised mui-btn--danger"
          >
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
                  <input
                    type="checkbox"
                    name="select"
                    checked={selectAll}
                    onChange={() => {
                      console.log();

                      setSelectAll(!selectAll);
                      actionSelect();
                    }}
                  />
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
                ? userData.map(item => {
                    return <TableRow key={item.userId} userData={item} />;
                  })
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
