const Loading = () => {
  return (
    <div
      className="flex items-center justify-center  w-full p-4"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="text-center max-w-xs w-full">
        {/* Spinner */}
        <div className="relative w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4">
          <div
            className="absolute inset-0 border-2 sm:border-3 md:border-4 border-transparent rounded-full animate-spin"
            style={{
              borderTopColor: "var(--color-accent)",
              borderRightColor: "var(--color-accent-light)",
              animationDuration: "1s",
            }}
          ></div>
        </div>

        {/* Loading text */}
        <p
          className="text-xs xs:text-sm sm:text-base md:text-lg font-medium px-2 break-words"
          style={{ color: "var(--color-text-primary)" }}
        >
          Yükleniyor...
        </p>
      </div>
    </div>
  );
};

export default Loading;
