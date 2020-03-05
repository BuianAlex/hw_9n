import React, { useState, Dispatch } from 'react';

interface IOptions {
  id: string;
  value: string;
  disabled?: boolean;
  label?: string;
  selectors: { val: string | number; name: string }[];
  addClasses?: string;
}

interface IProps {
  options: IOptions;
  onChange: Dispatch<string>;
}

const SelectFild: React.FC<IProps> = ({ options, onChange }) => {
  const [selectVal, setSelectVal] = useState(options.value);

  const actionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectVal(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={`mui-select ${options.addClasses} `}>
      <select
        id={options.id}
        value={selectVal}
        onChange={actionChange}
        disabled={options.disabled}
      >
        {options.selectors.map((item, i) => (
          <option key={i} value={item.val}>
            {item.name}
          </option>
        ))}
      </select>
      <label htmlFor={options.id}>{options.label}</label>
    </div>
  );
};
export default SelectFild;
