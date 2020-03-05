import React from 'react';
import { ScaleLoader } from 'react-spinners';
import './Spinner.scss';

const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spiner: React.FC = () => {
  return (
    <div className='sweet-loading'>
      <ScaleLoader css={override} color={'#065a69'} />
    </div>
  );
};

export default Spiner;
