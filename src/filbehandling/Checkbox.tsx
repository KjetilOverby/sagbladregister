/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";

const Checkbox = ({ sawbladeColumns, setSawbladeColumns, title }) => {
  const [allChecked, setAllChecked] = useState(false);

  const toggleAll = () => {
    const newValues = Object.keys(sawbladeColumns).reduce((obj, key) => {
      obj[key] = !allChecked;
      return obj;
    }, {});
    setSawbladeColumns(newValues);
    setAllChecked(!allChecked);
  };

  return (
    <div className="mb-10 flex w-96 flex-col rounded-xl border border-primary p-5">
      <h1>{title}</h1>
      <p className="my-5">Velg hvilke kolonner som skal vises</p>
      <button
        className="btn btn-sm mb-5 bg-warning text-white hover:bg-orange-300"
        onClick={toggleAll}
      >
        {allChecked ? "Uncheck All" : "Check All"}
      </button>
      {Object.entries(sawbladeColumns).map(([key, value], index) => (
        <div key={index}>
          <input
            type="checkbox"
            className="toggle toggle-warning mr-10 "
            checked={value}
            onChange={() => {
              setSawbladeColumns((prevState) => ({
                ...prevState,
                [key]: !prevState[key],
              }));
            }}
          />
          <label>{key}</label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
