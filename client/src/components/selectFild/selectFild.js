import React, { useState, memo } from "react";

const SelectFild = memo(({ options, onChange }) => {
  const [selectVal, setSelectVal] = useState(options.value);

  const actionChange = e => {
    setSelectVal(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="mui-select">
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
});
export default SelectFild;
