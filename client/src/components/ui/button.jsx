import React from "react";

const Button = ({
  type,
  size,
  children,
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-bg-primary
    disabled:opacity-50 disabled:cursor-not-allowed
    hover:scale-[1.02] active:scale-[0.98]
  `;

  const getTypeClasses = () => {
    switch (type) {
      case "primary":
        return `
          bg-transparent hover:bg-color-accent
          text-text-secondary font-semibold hover:text-white
          border border-color-accent
          focus:ring-color-accent/40
        `;

      case "secondary":
        return `
          bg-transparent hover:bg-bg-tertiary
          text-text-primary hover:text-text-primary
          border border-bg-tertiary
          focus:ring-bg-tertiary/40
        `;

      case "danger":
        return `
          bg-transparent hover:bg-color-danger
          text-color-danger hover:text-white
          border border-color-danger
          focus:ring-color-danger/40
        `;

      case "success":
        return `
          bg-transparent hover:bg-color-success
          text-color-success hover:text-white
          border border-color-success
          focus:ring-color-success/40
        `;

      case "warning":
        return `
          bg-transparent hover:bg-color-warning
          text-color-warning hover:text-white
          border border-color-warning
          focus:ring-color-warning/40
        `;

      case "ghost":
        return `
          bg-transparent hover:bg-bg-secondary
          text-text-secondary hover:text-text-primary
          border border-transparent hover:border-bg-tertiary
          focus:ring-bg-tertiary/30
        `;

      case "outline":
        return `
          bg-transparent hover:bg-color-accent
          text-color-accent hover:text-white
          border border-color-accent
          focus:ring-color-accent/30
        `;

      default:
        return `
          bg-transparent hover:bg-color-accent
          text-color-accent hover:text-white
          border border-color-accent
          focus:ring-color-accent/40
        `;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return "px-3 py-1.5 text-xs rounded-md gap-1.5";
      case "sm":
        return "px-4 py-2 text-sm rounded-md gap-2";
      case "md":
        return "px-6 py-2.5 text-base rounded-lg gap-2.5";
      case "lg":
        return "px-8 py-3 text-lg rounded-lg gap-3";
      case "xl":
        return "px-10 py-4 text-xl rounded-xl gap-3.5";
      default:
        return "px-6 py-2.5 text-base rounded-lg gap-2.5";
    }
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${getTypeClasses()}
        ${getSizeClasses()}
        ${className}
      `
        .replace(/\s+/g, " ")
        .trim()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="flex items-center justify-center gap-inherit">
        {children}
      </span>
    </button>
  );
};

export default Button;
