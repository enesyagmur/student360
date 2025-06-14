import React from "react";

const ConfirmModal = ({ type, message, confirmModal, setConfirmModal }) => {
  // modal kapalıysa null döndür
  if (!confirmModal.open) return null;

  // type'a göre renk sınıflarını belirle
  const colorClasses = {
    success: "bg-color-success hover:bg-color-success/90",
    danger: "bg-color-danger hover:bg-color-danger/90",
    warning: "bg-color-warning hover:bg-color-warning/90",
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-bg-primary rounded-xl p-16 max-w-md w-full mx-4 shadow-2xl border border-bg-quaternary">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-text-primary mb-6">
            {message}
          </h3>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => {
                setConfirmModal((prev) => ({
                  ...prev,
                  open: false,
                  teacherId: "",
                }));
              }}
              className="px-6 py-2.5 text-sm font-medium text-text-secondary bg-bg-tertiary hover:bg-bg-quaternary rounded-lg transition-all duration-200"
            >
              Vazgeç
            </button>
            <button
              onClick={() => {
                setConfirmModal((prev) => ({
                  ...prev,
                  open: false,
                  answer: true,
                }));
              }}
              className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200 ${
                colorClasses[type] || colorClasses.success
              }`}
            >
              Onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
