import React from "react";
import { ScaleLoader } from "react-spinners";
import "./spinner.scss";

const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spiner: React.FC = () => {
  return (
    <div className="sweet-loading">
      <ScaleLoader
        css={override}
        //size={150}
        //size={"150px"} this also works
        color={"#065a69"}
        //loading={}
      />
    </div>
  );
};

export default Spiner;
