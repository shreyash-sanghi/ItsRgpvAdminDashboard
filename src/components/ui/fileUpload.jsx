import React from "react";

const FileUpload = ({ id, value, onChange, accept, required }) => {
  return (
    <input
      type="file"
      id={id}
      value={value}
      onChange={onChange}
      accept={accept}
      className="w-full p-3 rounded-md border bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
      required={required}
    />
  );
};

export default FileUpload;
