/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Bar, Pie, Donut } from 'react-roughviz';
import './UserPage.scss';

import { getAllUsers, deleteUser, usersStats } from '../../services/api';
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
    actionSetTableSize,
    tableSize,
    mainUser,
    isWaitResponse,
    formMessage,
    actionGetUsersList,
    usersData,
    actionSelectRow,
    rowSelected,
    actionDeleteUser,
    userCard,
    actionCreateNewUser,
    actionEditUser,
    actionsGetStats,
    isWaitSatsResponse,
    statData,
    isStatsRequestError,
    actionSetPage,
    tablePage
  } = props;

  console.log(tablePage, tableSize);

  const [userData, setUserData] = useState([]);
  const [ertert, setUserCard] = useState({
    open: false,
    data: {}
  });
  const [usersSelected, setUsersSelected] = useState(0);
  // const [spinnerState, setSpinerState] = useState(isSpinner);
  // const [formMessage, setFormMessage] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [total, setTotal] = useState(0);
  const [curentPage, setCurentPage] = useState(1);
  // const [statData, setStatData] = useState({});
  const [waitStats, setWaitStats] = useState(false);

  useEffect(() => {
    actionsGetStats();
    actionGetUsersList(tableSize, tablePage);
  }, []);

  // useEffect(() => {
  //   console.log(curentPage);

  //   getUsers();
  // }, [curentPage]);

  // useEffect(() => {
  //   console.log('ere');

  //   if (curentPage === 1) {
  //     getUsers();
  //   }
  //   setCurentPage(1);
  // }, [tableSize]);

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

  const actionDeleteSelected = async () => {
    // setSpinerState(true);
    // let toDelete = [];
    // userData.forEach(item => {ally
    // setSpinerState(false);
    // if (apiRes.result) {
    //   getUsers();
    // } else {
    //   setFormMessage({ msg: apiRes.error, type: 2 });
    // }
  };

  const getUsers = () => {};

  return (
    <>
      {userCard.state && (
        <UserCard
          onClose={actionCardClose}
          userData={userCard.data}
          updateTable={getUsers}
        />
      )}
      <h2 className='section-header'>Users</h2>
      {mainUser.usergroup === userRole.USER_ADMIN && (
        <div className='action-bar'>
          <button
            onClick={actionCreateNewUser}
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
            onClick={() => {
              actionDeleteUser(rowSelected);
            }}
            disabled={rowSelected.length === 0}
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
                    // setSelectAll(!selectAll);
                    actionSelectRow();
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
            {usersData.usersList
              ? usersData.usersList.map(item => {
                  const inSelectList =
                    rowSelected.indexOf(item.userId) === -1 ? false : true;
                  return (
                    <TableRow
                      key={item.userId}
                      userData={item}
                      onSelect={actionSelectRow}
                      select={inSelectList}
                      onEdit={actionEditUser}
                    />
                  );
                })
              : false}
          </tbody>
          <tfoot>
            <tr>{/* <td>/td>
              <td></td> */}</tr>
          </tfoot>
        </table>

        <div className='table-footer'>
          <span>Selected: {rowSelected.length}</span>
          <Pagination
            current={tablePage}
            total={usersData.totalUsers}
            pageSize={tableSize}
            hideOnSinglePage={true}
            onChange={actionSetPage}
            showTitle={false}
          />
          <div className='table-footer-right-side'>
            <span>
              {'Users ' +
                tablePageRange(tablePage, usersData.totalUsers, tableSize) +
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
              onChange={actionSetTableSize}
            />
          </div>
        </div>
      </div>

      <div className='mui-container-fluid'>
        <h3>Users Stats</h3>
        <button
          onClick={actionsGetStats}
          className='mui-btn mui-btn--small mui-btn--raised '
        >
          Update
        </button>
        <div className='mui-row stat-row'>
          <div className='mui-panel mui-col-md-4 stat-panel'>
            {isWaitSatsResponse && <Spiner />}
            {isStatsRequestError.state && (
              <FormMessage
                messageType={isStatsRequestError.type}
                messageText={isStatsRequestError.msg}
              />
            )}
            {statData.gender && (
              <Pie
                data={{
                  labels: Object.keys(statData.gender),
                  values: Object.values(statData.gender)
                }}
                title='Gender'
                colors={['pink', 'skyblue', 'orange']}
                roughness={5}
                strokeWidth={3}
              />
            )}
          </div>
          <div className='mui-panel mui-col-md-4 stat-panel'>
            {isWaitSatsResponse && <Spiner />}
            {isStatsRequestError.state && (
              <FormMessage
                messageType={isStatsRequestError.type}
                messageText={isStatsRequestError.msg}
              />
            )}
            {statData.countries && (
              <Bar
                title='By country'
                data={{
                  labels: Object.keys(statData.countries),
                  values: Object.values(statData.countries)
                }}
                labels='flavor'
                values='price'
              />
            )}
          </div>
          <div className='mui-panel mui-col-md-4 stat-panel'>
            {isWaitSatsResponse && <Spiner />}
            {isStatsRequestError.state && (
              <FormMessage
                messageType={isStatsRequestError.type}
                messageText={isStatsRequestError.msg}
              />
            )}
            {statData.userGroup && (
              <Donut
                title='By user group'
                data={{
                  labels: Object.keys(statData.userGroup),
                  values: Object.values(statData.userGroup)
                }}
                labels='flavor'
                values='price'
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default UsersPage;
