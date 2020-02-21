/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { TableContext } from './tablecontext';
import moment from 'moment';

interface userData {
  userId: string;
  loginName: string;
  email: string;
  phone: string;
  usergroup: string;
  lastVisit: moment.Moment;
  registrated: moment.Moment;
}

interface IProps {
  key: string;
  userData: userData;
  select: boolean;
  onSelect: (id: string) => {};
}

const Row: React.FC<IProps> = props => {
  const { userData, onSelect, select } = props;
  const [isSelected, setSelected] = useState<boolean>(false);

  // const { sel, setSel } = useState<boolean>('gfhfg');
  // const { actionSelect, actionShowUser } = useContext(TableContext);

  // useEffect(() => {
  //
  // }, [isSelected]);
  function onChange() {
    setSelected(!isSelected);
    onSelect(userData.userId);
  }

  return (
    <tr
      onClick={e => {
        // actionShowUser(e, userData.userId);
      }}
    >
      <td className='checkbox'>
        <input
          className='checkbox-input'
          type='checkbox'
          name='select'
          checked={select}
          onChange={() => {
            onChange(); // actionSelect(userData.userId);
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
