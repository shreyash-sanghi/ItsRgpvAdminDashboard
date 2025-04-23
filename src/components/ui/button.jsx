import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="px-6 py-2 text-lg text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
    >
      {label}
    </button>
  );
};

export default Button;
