import React from "react";

const FileUpload = ({ id, onChange, accept, multiple = false, required }) => {
  return (
    <input
      type="file"
      id={id}
      multiple={multiple}  // Enable multiple file selection if true
      onChange={(e) => {
        const files = Array.from(e.target.files);
        // Return single file if not multiple, otherwise return array
        onChange(multiple ? files : files[0]);
      }}
      accept={accept}
      className="w-full p-3 rounded-md border bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
      required={required}
    />
  );
};

export default FileUpload;