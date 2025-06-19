import React from "react";

const Loading = () => (
  <div className="flex flex-col items-center justify-center w-full h-full py-8">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-color-accent border-t-transparent rounded-full animate-spin"></div>
      <span className="sr-only">Yükleniyor...</span>
    </div>
    <span className="mt-4 text-sm text-text-secondary transition">
      Yükleniyor...
    </span>
  </div>
);

export default Loading;
