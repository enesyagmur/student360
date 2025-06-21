import React from "react";
import { Search, X, Plus } from "lucide-react";

const PageHeader = ({ title, search, setSearch, setShowAddModal }) => {
  return (
    <div
      className="border-b p-6 my-4 rounded-lg"
      style={{
        backgroundColor: "var(--color-bg-tertiary)",
        borderColor: "var(--color-bg-quaternary)",
      }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            {title}
          </h1>
          <p style={{ color: "var(--color-text-tertiary)" }}>
            Oluşturun, arayın ve yönetin
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
          {/* Arama Kutusu */}
          <div className="relative flex-1 lg:flex-none lg:w-80">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: "var(--color-text-tertiary)" }}
            />
            <input
              type="text"
              placeholder="ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                borderColor: "var(--color-bg-tertiary)",
                color: "var(--color-text-secondary)",
                "--tw-ring-color": "var(--color-accent)",
              }}
            />
            <X
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer ${
                search !== "" ? "flex" : "hidden"
              }`}
              style={{ color: "var(--color-text-tertiary)" }}
              onClick={() => setSearch("")}
            />
          </div>

          {/* Oluştur Butonu */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 text-white rounded-lg shadow-md px-4 py-2 transition hover:opacity-90"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <Plus className="w-5 h-5" />
            Oluştur
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
