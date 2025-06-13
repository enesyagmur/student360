import React from "react";

const Button = ({ type, size, children, onClick }) => {
  let baseClasses =
    "flex items-center rounded-md font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  let typeClasses = "";
  switch (type) {
    case "primary":
      typeClasses =
        "bg-indigo-600 focus:ring-indigo-500 text-white border border-indigo-700 ";
      break;
    case "secondary":
      typeClasses =
        " hover:bg-slate-600 focus:ring-slate-500 text-slate-200  border border-slate-600";
      break;
    case "danger":
      typeClasses =
        " hover:bg-red-600 focus:ring-red-500 text-white border border-red-900";
      break;
    default:
      typeClasses =
        " hover:bg-indigo-700 focus:ring-indigo-500 text-white border border-indigo-700 ";
  }

  let sizeClasses = "";
  switch (size) {
    case "sm":
      sizeClasses = "py-1 px-3 text-sm";
      break;
    case "md":
      sizeClasses = "py-2 px-6 text-base";
      break;
    case "lg":
      sizeClasses = "py-3 px-8 text-lg";
      break;
    default:
      sizeClasses = "py-2 px-6 text-base";
  }

  return (
    <button
      className={`${baseClasses} ${typeClasses} ${sizeClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
