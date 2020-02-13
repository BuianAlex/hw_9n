import React from 'react';

interface IProps {
  result: any;
}

const ResultPopUpWindow: React.FC<IProps> = props => {
  const { result } = props;
  return (
    <div>
      {Object.keys(result).map((item: string, key: number) => {
        return (
          <div key={key}>
            <h3>{item + ': ' + result[item].length}</h3>
            {result[item].map((entry: any, j: number) => {
              return <p key={j}>{JSON.stringify(entry)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ResultPopUpWindow;
