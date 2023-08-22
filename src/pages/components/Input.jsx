import React from "react";

const Input = ({ type, name, register, id, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className="border py-2 px-3 text-grey-800"
      {...register(name)}
    />
  );
};

export default Input;
