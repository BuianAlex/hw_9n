import React from "react";
import "./formMessage.scss";

interface Props {
  messange: string;
  type: number;
}

const FormMessage: React.FC<Props> = props => {
  let messangeType: String = "";
  switch (props.type) {
    case 0:
      messangeType = "successful";
      break;
    case 1:
      messangeType = "warning";
      break;
    case 2:
      messangeType = "error";
      break;

    default:
      break;
  }
  return (
    <div className={`form-message ${messangeType}`}>
      <span className={`form-message-text`}>{props.messange} </span>
    </div>
  );
};

export default FormMessage;
