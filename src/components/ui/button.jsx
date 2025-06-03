import React from "react";

const Button = ({ type, size, children, onClick }) => {
  let baseClasses =
    "rounded-md font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  let typeClasses = "";
  switch (type) {
    case "primary":
      typeClasses =
        "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white";
      break;
    case "secondary":
      typeClasses =
        "bg-slate-700 hover:bg-slate-600 focus:ring-slate-500 text-slate-200";
      break;
    case "danger":
      typeClasses = "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white";
      break;
    default:
      typeClasses =
        "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white";
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
