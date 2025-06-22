import React from "react";
import { Search, X, Plus } from "lucide-react";
import Button from "./button";

const PageHeader = ({ title, search, setSearch, setShowAddModal }) => {
  return (
    <div className="relative overflow-hidden bg-bg-secondary border border-bg-tertiary rounded-2xl shadow-lg backdrop-blur-sm my-2">
      {/* Gradient overlay for modern feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary/50 to-bg-tertiary/30 pointer-events-none"></div>

      <div className="relative p-8">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
          {/* Title Section */}
          <div className="flex-1">
            <div className="space-y-3">
              <h1 className="text-3xl xl:text-4xl font-bold text-text-primary tracking-tight">
                {title}
              </h1>
              <p className="text-lg text-text-tertiary font-medium">
                Oluşturun, arayın ve yönetin
              </p>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full xl:w-auto min-w-0">
            {/* Search Box */}
            <div className="relative group flex-1 xl:flex-none xl:w-96">
              <div className="absolute inset-0 bg-gradient-to-r from-color-accent/20 to-color-accent-light/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>

              <div className="relative bg-bg-secondary/80 backdrop-blur-sm border border-bg-tertiary rounded-xl transition-all duration-300 group-focus-within:border-color-accent/50 group-focus-within:shadow-lg group-focus-within:shadow-color-accent/10">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary group-focus-within:text-color-accent transition-colors duration-300" />

                <input
                  type="text"
                  placeholder="Ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-text-primary placeholder-text-tertiary rounded-xl pl-12 pr-12 py-4 text-base font-medium focus:outline-none focus:ring-0 border-0"
                />

                <X
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer transition-all duration-300 hover:scale-110 ${
                    search !== ""
                      ? "text-text-tertiary hover:text-color-danger opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                  onClick={() => setSearch("")}
                />
              </div>
            </div>

            {/* Create Button */}

            <Button
              onClick={() => setShowAddModal(true)}
              type={"primary"}
              size={"lg"}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
