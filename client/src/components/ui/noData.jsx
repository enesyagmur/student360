import React from "react";
import { Search } from "lucide-react";

const NoData = ({ message = "Sonuç bulunamadı" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Icon */}
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "var(--color-bg-tertiary)" }}
      >
        <Search
          className="w-8 h-8 sm:w-10 sm:h-10"
          style={{ color: "var(--color-text-tertiary)" }}
        />
      </div>

      {/* Message */}
      <h3
        className="text-lg sm:text-xl font-medium mb-2"
        style={{ color: "var(--color-text-primary)" }}
      >
        {message}
      </h3>

      <p
        className="text-sm sm:text-base text-center max-w-sm"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Aradığınız kriterlere uygun veri bulunamadı.
      </p>
    </div>
  );
};

export default NoData;
