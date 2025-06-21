import React from "react";

const Loading = () => {
  return (
    <div
      className="flex items-center justify-center h-full"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4">
          <div
            className="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
            style={{
              borderTopColor: "var(--color-accent)",
              borderRightColor: "var(--color-accent-light)",
              animationDuration: "1s",
            }}
          ></div>
        </div>

        {/* Loading text */}
        <p
          className="text-sm sm:text-base md:text-lg font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Yükleniyor...
        </p>
      </div>
    </div>
  );
};

export default Loading;
