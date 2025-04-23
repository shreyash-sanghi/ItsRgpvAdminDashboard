import React, { useState } from "react";

const Form = ({ title, fields, initialState, onSubmit }) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <form onSubmit={handleSubmit} className="py-4">
          {title && <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">{title}</h2>}

          {fields.map((field, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={field.id}
                className="block font-medium mb-2 text-gray-600 dark:text-gray-300"
              >
                {field.label}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  value={formState[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={field.rows || 3}
                  className="w-full p-3 rounded-md border bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                  required={field.required}
                  minLength={field.minLength}
                  maxLength={field.maxLength}
                />
              ) : field.type === "file" ? (
                <input
                  id={field.id}
                  type="file"
                  onChange={(e) => handleChange(field.name, e.target.files[0])}
                  className="w-full p-3 rounded-md border bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ) : (
                <input
                  id={field.id}
                  type={field.type}
                  value={formState[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full p-3 rounded-md border bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="px-6 py-2 text-lg text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
