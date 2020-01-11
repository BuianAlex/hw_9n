import React, { useContext, memo } from "react";
import { TableContext } from "./tablecontext";
import * as moment from "moment";

const Row = memo(({ userData }) => {
  const { actionSelect, actionShowUser } = useContext(TableContext);
  return (
    <tr
      onClick={e => {
        actionShowUser(e, userData._id);
      }}
    >
      <td className="checkbox">
        <input
          type="checkbox"
          name="select"
          checked={userData.isSelected || false}
          onChange={() => {
            actionSelect(userData._id);
          }}
        />
      </td>
      {/* <td className="name">{userData.name}</td> */}
      <td>{userData.loginName}</td>
      <td>{userData.email}</td>
      <td>{userData.phone}</td>
      <td>{userData.usergroup}</td>
      <td>{moment(userData.lastVisit).format("MMM DD hh:mm:ss")}</td>
      <td>{moment(userData.registrated).format("MMM DD hh:mm:ss")}</td>
      {/* <td>{userData._id}</td> */}
    </tr>
  );
});

export default React.memo(Row);
