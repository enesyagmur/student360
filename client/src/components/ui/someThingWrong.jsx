import React from "react";
import { AlertCircle } from "lucide-react";

const SomeThingWrong = ({ err }) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg text-center"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        {/* Error Icon */}
        <div
          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--color-danger)" }}
        >
          <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
        </div>

        {/* Error Message */}
        <h2
          className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold mb-2 sm:mb-3 lg:mb-4 leading-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          Oops! Bir Hata Oluştu
        </h2>

        <p
          className="text-xs sm:text-sm lg:text-base leading-relaxed px-2 sm:px-0"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {err.message ||
            "Beklenmeyen bir hata meydana geldi. Lütfen daha sonra tekrar deneyin."}
        </p>
      </div>
    </div>
  );
};

export default SomeThingWrong;
