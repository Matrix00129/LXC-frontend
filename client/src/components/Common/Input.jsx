import React from 'react';
import './path-to-your-styles/tailwind.css';

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border rounded px-2 py-1"
    />
  );
};

export default Input;
