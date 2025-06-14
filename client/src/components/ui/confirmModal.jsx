import React from "react";

// dinamik onay modalı
// type: success, danger, warning gibi farklı durumlar için
// message: gösterilecek mesaj
// setAnswer: modal kapandığında true/false döndüren fonksiyon
const ConfirmModal = ({ type = "success", message, setAnswer, isOpen }) => {
  // modal kapalıysa null döndür
  if (!isOpen) return null;

  // type'a göre renk sınıflarını belirle
  const colorClasses = {
    success: "bg-green-500 hover:bg-green-600",
    danger: "bg-red-500 hover:bg-red-600",
    warning: "bg-yellow-500 hover:bg-yellow-600",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {message}
          </h3>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => setAnswer(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
            >
              Vazgeç
            </button>
            <button
              onClick={() => setAnswer(true)}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors duration-200 ${
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
