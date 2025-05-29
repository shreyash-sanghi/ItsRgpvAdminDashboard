import React from "react";

const SelectField = ({ id, label, value, onChange, options, placeholder, required }) => {
    return (
        <div className="flex flex-col gap-2" >

            {label && (
                <label
                    htmlFor={id}
                    className="text-gray-700 dark:text-gray-200 font-medium"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="w-full p-3 rounded-md border bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
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
