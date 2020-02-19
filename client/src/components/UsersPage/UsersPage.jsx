import React, { useState, useEffect } from 'react';
import './UserPage.scss';

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { getAllUsers, deleteUser } from '../../services/api';
import { TableContext } from './tablecontext';
import Spiner from '../spinner/spinner';
import UserCard from '../userCard/UserCardContainer';
import TableRow from './userTableRow';
import SelectFild from '../selectFild/selectFild';
import FormMessage from '../FormMessage/FormMessage';
import tablePageRange from '../../utils/tablePageRange';
import { userRole } from '../../constants';

const UsersPage = props => {
  const {
    sendUsersCsv,
    setTableSize,
    tableSize,
    mainUser,
    isWaitResponse,
    formMessage,
    getUserList,
    usersData
  } = props;
  const [userData, setUserData] = useState([]);
  const [userCard, setUserCard] = useState({
    open: false,
    data: {}
  });
  const [usersSelected, setUsersSelected] = useState(0);
  // const [spinnerState, setSpinerState] = useState(isSpinner);
  // const [formMessage, setFormMessage] = useState(Object || Boolean);
  const [selectAll, setSelectAll] = useState(false);
  const [total, setTotal] = useState(0);
  const [curentPage, setCurentPage] = useState(1);

  //temp
  // useEffect(() => {
  //   setSpinerState(isSpinner);
  // }, [isSpinner]);

  useEffect(() => {
    getUserList(tableSize, curentPage);
  }, [curentPage, getUserList, tableSize]);

  // useEffect(() => {
  //   getUsers();
  // }, [curentPage]);

  // useEffect(() => {
  //   if (curentPage === 1) {
  //     getUsers();
  //   }
  //   setCurentPage(1);
  // }, [curentPage, tableSize]);

  // const getUsers = useCallback(async () => {
  //   setSpinerState(true);
  //   const apiRes = await getAllUsers(tableSize, curentPage);
  //   setSpinerState(false);
  //   setFormMessage(false);
  //   setUsersSelected(0);
  //   if (!apiRes.error) {
  //     setUserData(apiRes.result.usersList);
  //     setTotal(apiRes.result.totalUsers);
  //   } else {
  //     setFormMessage({
  //       msg: apiRes.error,
  //       type: 2
  //     });
  //   }
  // });

  const actionCardClose = () => {
    setUserCard(state => ({ ...state, open: false, data: {} }));
  };

  const actionAddNew = () => {
    setUserCard(state => ({ ...state, open: true }));
  };

  const actionShowUser = (e, id) => {
    if (
      e.target.type !== 'checkbox' &&
      !e.target.classList.contains('checkbox')
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
    // setSpinerState(true);
    // let toDelete = [];
    // userData.forEach(item => {
    //   if (item.isSelected) {
    //     toDelete.push(item.userId);
    //   }
    // });
    // const apiRes = await deleteUser(toDelete);
    // setSpinerState(false);
    // if (apiRes.result) {
    //   getUsers();
    // } else {
    //   setFormMessage({ msg: apiRes.error, type: 2 });
    // }
  };

  // const actionSendCsv = async e => {
  //   e.preventDefault()

  //   const apiRes = await sendCsv(e.target.files)
  //   setcsvRes({ data: apiRes, show: true })
  //   console.log(apiRes)
  //   getUsers()
  // }

  return (
    <>
      {/* {userCard.open && (
        <UserCard
          onClose={actionCardClose}
          userData={userCard.data}
          updateTable={getUsers}
        />
      )} */}
      <h2 className='section-header'>Users</h2>
      {mainUser.usergroup === userRole.USER_ADMIN && (
        <div className='action-bar'>
          <button
            onClick={actionAddNew}
            className='mui-btn mui-btn--small mui-btn--raised'
          >
            ADD User
          </button>
          <div className='upload-btn-wrapper'>
            <button className='mui-btn mui-btn--small mui-btn--raised'>
              Import from csv
            </button>
            <input
              type='file'
              name='myfile'
              onChange={e => sendUsersCsv(e.target.files)}
            />
          </div>
          {/* <input type="text" placeholder="Find user" />
          <button>Find</button> */}
          <button
            onClick={actionDeleteSelected}
            disabled={usersSelected === 0}
            className='mui-btn mui-btn--small mui-btn--raised mui-btn--danger'
          >
            Delete
          </button>

          {/* 
          <button>Filter</button> */}
        </div>
      )}
      {isWaitResponse && <Spiner />}
      {formMessage.state && (
        <FormMessage
          messageType={formMessage.type}
          messageText={formMessage.msg}
        />
      )}
      <TableContext.Provider value={{ actionSelect, actionShowUser }}>
        <div className='user-table'>
          <table>
            <thead>
              <tr>
                <th className='checkbox'>
                  <input
                    type='checkbox'
                    name='select'
                    checked={selectAll}
                    onChange={() => {
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
                ? usersData.usersList.map(item => {
                    return <TableRow key={item.userId} userData={item} />;
                  })
                : false}
            </tbody>
            <tfoot>
              <tr>{/* <td>/td>
              <td></td> */}</tr>
            </tfoot>
          </table>

          <div className='table-footer'>
            <span>Selected: {usersSelected}</span>
            <Pagination
              current={curentPage}
              total={usersData.totalUsers}
              pageSize={tableSize}
              hideOnSinglePage={true}
              onChange={setCurentPage}
              showTitle={false}
            />
            <div className='table-footer-right-side'>
              <span>
                {'Users ' +
                  tablePageRange(curentPage, usersData.totalUsers, tableSize) +
                  ' of ' +
                  usersData.totalUsers}
              </span>

              <SelectFild
                options={{
                  id: 'userLimit',
                  value: tableSize,
                  addClasses: 'footer-select',
                  disabled: false,
                  selectors: [
                    { val: 10, name: '10' },
                    { val: 20, name: '20' },
                    { val: 50, name: '50' },
                    { val: 100, name: '100' }
                  ]
                }}
                onChange={setTableSize}
              />
            </div>
          </div>
        </div>
      </TableContext.Provider>
    </>
  );
};
export default UsersPage;
