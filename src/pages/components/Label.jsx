import React from "react";

const Label = ({ forLabel, value }) => {
  return (
    <label className="mb-2 font-bold text-lg text-gray-900" htmlFor={forLabel}>
      {value}
    </label>
  );
};

export default Label;
