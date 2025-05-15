import React from "react";

const Input = ({ id, label, type, value, onChange, placeholder, required, maxLength }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-gray-700 dark:text-gray-200 font-medium"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 rounded-md border bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
        required={required}
      />
    </div>
  );
};

export default Input;
