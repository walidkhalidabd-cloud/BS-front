// Input.js
import React from "react";

const MyInput = ({ type, placeholder, name, value, onChange ,error , col=6}) => {
  return (
    <div className={`col-${col} py-1`}>
      <input
        className="form-control"
        type={type ?? "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}                
      />
      {error && <small className="text-warning">{error[0]}</small>}

    </div>
  );
};

export default MyInput;
