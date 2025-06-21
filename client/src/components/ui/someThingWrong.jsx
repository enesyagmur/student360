import React from "react";
import { AlertCircle } from "lucide-react";

const SomeThingWrong = ({ err }) => {
  return (
    <div
      className="flex items-center justify-center h-full"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div
        className="w-full max-w-md p-6 sm:p-8 rounded-lg shadow-lg text-center"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        {/* Error Icon */}
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--color-danger)" }}
        >
          <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>

        {/* Error Message */}
        <h2
          className="text-lg sm:text-xl font-semibold mb-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          Oops! Bir Hata Oluştu
        </h2>

        <p
          className="text-sm sm:text-base"
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
