// Input.js
import React from 'react';

const MyInput = ({ type, placeholder, name , value, onChange }) => {
    return (
        <input
            type={type??'text'}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
                padding: '10px',
                margin: '2px 0.5% ',
                border: '1px solid #ccc',
                borderRadius: '4px',
                height: "2.3em",
                width: "48%"
            }}
        />
    );
};

export default MyInput;
