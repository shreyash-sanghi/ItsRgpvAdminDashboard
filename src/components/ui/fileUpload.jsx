import React from "react";

const   FileUpload = ({ id, label, onChange, accept, multiple = false, required }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-gray-700 dark:text-gray-200 font-medium"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type="file"
        id={id}
        multiple={multiple}  // Enable multiple file selection if true
        onChange={(e) => {
          const files = Array.from(e.target.files);
          onChange(multiple ? files : files[0]);
        }}
        accept={accept}
        className="w-full p-3 rounded-md border bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
        required={required}
      />
    </div>
  );
};

export default FileUpload;