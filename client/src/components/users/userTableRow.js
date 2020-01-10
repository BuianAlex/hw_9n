import React, { useContext, useEffect, memo } from "react";
import { TableContext } from "./tablecontext";

const Row = memo(({ userData }) => {
  const { actionSelect, actionShowUser } = useContext(TableContext);
  useEffect(() => {
    console.log(userData._id);
  });
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
      <td className="name">{userData.name}</td>
      <td>{userData.loginName}</td>
      <td>{userData.email}</td>
      <td>{userData.phone}</td>
      <td>{userData.usergroup}</td>
      <td>{userData.lastVisit}</td>
      <td>{userData.registrated}</td>
      {/* <td>{userData._id}</td> */}
    </tr>
  );
});

// function Row({ userData }) {
//   const { actionSelect, actionShowUser } = useContext(TableContext);
//   useEffect(() => {
//     console.log(userData._id);
//   });
//   return (
//     <tr
//       onClick={e => {
//         actionShowUser(e, userData._id);
//       }}
//     >
//       <td className="checkbox">
//         <input
//           checked={userData.isSelected || false}
//           onChange={() => {
//             actionSelect(userData._id);
//           }}
//         />
//       </td>
//       <td className="name">{userData.name}</td>
//       <td>{userData.loginName}</td>
//       <td>{userData.email}</td>
//       <td>{userData.phone}</td>
//       <td>{userData.usergroup}</td>
//       <td>{userData.lastVisit}</td>
//       <td>{userData.registrated}</td>
//       {/* <td>{userData._id}</td> */}
//     </tr>
//   );
// }
// type="checkbox"
// name="select"

export default React.memo(Row);
