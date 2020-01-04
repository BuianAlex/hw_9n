import React from "react";

function Row(props) {
  return (
    <tr
      onClick={e => {
        props.actionShowUser(e, props.userData._id);
      }}
    >
      <td className="checkbox">
        <input
          type="checkbox"
          name="select"
          checked={props.userData.isSelected || false}
          onChange={() => {
            props.actionSelect(props.userData._id);
          }}
        />
      </td>
      <td className="name">{props.userData.name}</td>
      <td>{props.userData.loginName}</td>
      <td>{props.userData.email}</td>
      <td>{props.userData.phone}</td>
      <td>{props.userData.usergroup}</td>
      <td>{props.userData.lastVisit}</td>
      <td>{props.userData.registrated}</td>
      <td>{props.userData._id}</td>
    </tr>
  );
}

export default React.memo(Row);
