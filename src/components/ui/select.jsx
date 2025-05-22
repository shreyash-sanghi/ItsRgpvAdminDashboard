import React from "react";

const SelectField = ({ id, label, value, onChange, options, placeholder, required }) => {
    return (
        <div className="mb-4" >

            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-gray-100 focus:ring-blue-500 focus:border-transparent"
                required={required}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
