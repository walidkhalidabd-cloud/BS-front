// Input.js
import React from "react";

const MyInput = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className="col-6 py-1">
      <input
        className="form-control"
        type={type ?? "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}        
      />
    </div>
  );
};

export default MyInput;
