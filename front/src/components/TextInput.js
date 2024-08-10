import React from 'react';
import '../styles/TextInput.css';

const TextInput = ({ label, type, value, onChange, placeholder, disabled }) => {
  return (
    <div className="input-wrapper">
      <label className="label">{label}</label>
      <input
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required
      />
    </div>
  );
};

export default TextInput;
