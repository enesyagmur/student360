import React from "react";
import { Book, CreditCard, Edit, Eye, Settings, X } from "lucide-react";
import Button from "../../../ui/button"; // Button component'inizi import edin

const LessonCard = ({ lesson, user, setConfirmModal }) => {
  return (
    <div className="group relative bg-bg-secondary border border-bg-tertiary rounded-xl p-4 hover:bg-bg-tertiary hover:border-bg-quaternary transition-all duration-300 hover:shadow-lg">
      {/* Main Content - Title & Credit Prominent */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-xl font-bold text-text-primary mb-2 leading-tight">
              {lesson.name || "İsimsiz Ders"}
            </h3>
            <div className="flex items-center gap-2 text-base text-text-secondary font-medium">
              <CreditCard className="w-5 h-5" />
              <span>{lesson.credit || "0"} Kredi</span>
            </div>
          </div>

          {/* Action Buttons - Only for principals */}
          {user?.position.includes("principal") && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button type="success" size="sm" className="p-2">
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                onClick={() =>
                  setConfirmModal({
                    open: true,
                    selectedItemId: lesson.lessonId,
                  })
                }
                type="danger"
                size="md"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
              lesson.isActive
                ? "bg-color-success/20 text-color-success border border-color-success/30"
                : "bg-color-danger/20 text-color-danger border border-color-danger/30"
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full mr-2 ${
                lesson.isActive ? "bg-color-success" : "bg-color-danger"
              }`}
            ></div>
            {lesson.isActive ? "Aktif" : "Pasif"}
          </span>

          {/* Small Icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-color-accent to-color-accent-light rounded-lg flex items-center justify-center text-white">
            <Book className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
