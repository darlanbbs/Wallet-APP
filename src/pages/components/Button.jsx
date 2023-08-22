import React from "react";

const Button = ({ value, type }) => {
  return (
    <button
      className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded"
      type={type}
    >
      {value}
    </button>
  );
};

export default Button;
