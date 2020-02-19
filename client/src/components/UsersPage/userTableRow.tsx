import React, { useContext, useEffect, useState } from 'react';
import { TableContext } from './tablecontext';
import moment from 'moment';

interface IProps {
  userId: string;
  loginName: string;
  email: string;
  phone: string;
  usergroup: string;
  lastVisit: moment.Moment;
  registrated: moment.Moment;
}

const Row: React.FC<IProps> = userData => {
  const { sel, setSel } = useState<boolean>(false);
  const { actionSelect, actionShowUser } = useContext(TableContext);

  useEffect(() => {
    setSel(!sel);
  }, [sel, setSel]);

  return (
    <tr
      onClick={e => {
        actionShowUser(e, userData.userId);
      }}
    >
      <td className='checkbox'>
        <input
          className='checkbox-input'
          type='checkbox'
          name='select'
          checked={selected}
          onChange={() => {
            actionSelect(userData.userId);
          }}
        />
      </td>
      {/* <td className="name">{userData.name}</td> */}
      <td>{userData.loginName}</td>
      <td>{userData.email}</td>
      <td>{userData.phone}</td>
      <td>{userData.usergroup}</td>
      <td>{moment(userData.lastVisit).format('MMM DD hh:mm:ss')}</td>
      <td>{moment(userData.registrated).format('MMM DD hh:mm:ss')}</td>
      {/* <td>{userData._id}</td> */}
    </tr>
  );
};

export default Row;
