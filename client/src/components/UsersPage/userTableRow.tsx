/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
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
  onEdit: (userData: object) => {};
}

const Row: React.FC<IProps> = props => {
  const { userData, onSelect, select, onEdit } = props;
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

  function openUserCard(target: HTMLInputElement): void {
    if (!target.classList.contains('checkbox') && target.type !== 'checkbox') {
      onEdit(userData);
    }
  }

  return (
    <tr
      onClick={(e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        openUserCard(target);
      }}
    >
      <td className='checkbox'>
        <input
          className='checkbox-input'
          type='checkbox'
          name='select'
          checked={select}
          onChange={() => {
            onChange();
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
