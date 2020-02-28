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
            <h3>{item.toLocaleUpperCase() + ': ' + result[item].length}</h3>
            {result[item].map((entry: any, j: number) => {
              let styleRow = {};
              switch (item) {
                case 'saved':
                  styleRow = { color: 'green' };
                  break;
                case 'schemaError':
                  styleRow = { color: 'orange' };
                  break;
                case 'duplicate':
                  styleRow = { color: 'tomato' };
                  break;
                case 'unnounError':
                  styleRow = { color: 'crimson' };
                  break;
                default:
                  break;
              }
              return (
                <p style={styleRow} key={j}>
                  {JSON.stringify(entry)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ResultPopUpWindow;
