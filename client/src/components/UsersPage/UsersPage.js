/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
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
  const { sendUsersCsv, setTableSize, tableSize, mainUser, isSpinner } = props;
  const [userData, setUserData] = useState([]);
  const [userCard, setUserCard] = useState({
    open: false,
    data: {}
  });
  const [usersSelected, setUsersSelected] = useState(0);
  const [spinnerState, setSpinerState] = useState(isSpinner);
  const [formMessage, setFormMessage] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [total, setTotal] = useState(0);
  const [curentPage, setCurentPage] = useState(1);
  const [statData, setStatData] = useState({});
  const [waitStats, setWaitStats] = useState(false);

  async function getUsers() {
    setSpinerState(true);
    const apiRes = await getAllUsers(tableSize, curentPage);
    setSpinerState(false);
    setFormMessage(false);
    setUsersSelected(0);
    if (!apiRes.error) {
      setUserData(apiRes.result.usersList);
      setTotal(apiRes.result.totalUsers);
    } else {
      console.log('apiRes');
      setFormMessage({
        msg: apiRes.error,
        type: 2
      });
    }
  }

  async function getUserStats() {
    setWaitStats(true);
    usersStats()
      .then(res => {
        setWaitStats(false);
        const { countries } = res.data;
        let other = { calc: 0, country: {} };
        let majority = {};
        Object.keys(countries).forEach(item => {
          if (countries[item] < 3) {
            other.country[item] = countries[item];
            other.calc += countries[item];
          } else {
            majority[item] = countries[item];
          }
        });
        majority['other < 3'] = other.calc;
        res.data.countries = majority;

        console.log(res.data.userGroup);

        setStatData(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  //temp
  useEffect(() => {
    setSpinerState(isSpinner);
  }, [isSpinner]);

  useEffect(() => {
    getUserStats();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(curentPage);

    getUsers();
  }, [curentPage]);

  useEffect(() => {
    console.log('ere');

    if (curentPage === 1) {
      getUsers();
    }
    setCurentPage(1);
  }, [tableSize]);

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

  // const actionSendCsv = async e => {
  //   e.preventDefault()

  //   const apiRes = await sendCsv(e.target.files)
  //   setcsvRes({ data: apiRes, show: true })
  //   console.log(apiRes)
  //   getUsers()
  // }

  return (
    <>
      {userCard.open && (
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
      {spinnerState && <Spiner />}

      {formMessage && (
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

          {formMessage && (
            <FormMessage messange={formMessage.msg} type={formMessage.type} />
          )}
          <div className='table-footer'>
            <span>Selected: {usersSelected}</span>
            <Pagination
              current={curentPage}
              total={total}
              pageSize={tableSize}
              hideOnSinglePage={true}
              onChange={setCurentPage}
              showTitle={false}
            />
            <div className='table-footer-right-side'>
              <span>
                {'Users ' +
                  tablePageRange(curentPage, total, tableSize) +
                  ' of ' +
                  total}
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
      <div className='mui-container-fluid'>
        <h3>Users Stats</h3>
        <button
          onClick={getUserStats}
          className='mui-btn mui-btn--small mui-btn--raised '
        >
          Update
        </button>
        <div className='mui-row stat-row'>
          <div class='mui-panel mui-col-md-4 stat-panel'>
            {waitStats && <Spiner />}
            {formMessage && (
              <FormMessage
                messageType={formMessage.type}
                messageText={formMessage.msg}
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
          <div class='mui-panel mui-col-md-4 stat-panel'>
            {waitStats && <Spiner />}
            {formMessage && (
              <FormMessage
                messageType={formMessage.type}
                messageText={formMessage.msg}
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
          <div class='mui-panel mui-col-md-4 stat-panel'>
            {waitStats && <Spiner />}
            {formMessage && (
              <FormMessage
                messageType={formMessage.type}
                messageText={formMessage.msg}
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
