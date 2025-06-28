import { useReducer } from "react";

export const initialState = {
  class: {},
  schedule: {
    monday: Array(6).fill({ lesson: "", teacherId: "", teacherName: "" }),
    tuesday: Array(6).fill({ lesson: "", teacherId: "", teacherName: "" }),
    wednesday: Array(6).fill({ lesson: "", teacherId: "", teacherName: "" }),
    thursday: Array(6).fill({ lesson: "", teacherId: "", teacherName: "" }),
    friday: Array(6).fill({ lesson: "", teacherId: "", teacherName: "" }),
  },
  errors: {},
  isSubmitting: false,
};

export function scheduleFormReducer(state, action) {
  switch (action.type) {
    case "SET_LESSON": {
      const updatedDay = state.schedule[action.day].map((item, idx) =>
        idx === action.hourId ? { ...item, lesson: action.lesson } : item
      );
      return {
        ...state,
        schedule: {
          ...state.schedule,
          [action.day]: updatedDay,
        },
      };
    }
    case "SET_TEACHER": {
      const updatedDay = state.schedule[action.day].map((item, idx) =>
        idx === action.hourId
          ? {
              ...item,
              teacherId: action.teacherId,
              teacherName: action.teacherName,
            }
          : item
      );
      return {
        ...state,
        schedule: {
          ...state.schedule,
          [action.day]: updatedDay,
        },
      };
    }
    case "SET_CLASS": {
      return {
        ...state,
        class: action.value,
      };
    }
    case "RESET_STATE": {
      return {
        class: {},
        schedule: {
          monday: Array(6).fill({ lesson: "", teacherId: "", teacherName: "" }),
          tuesday: Array(6).fill({
            lesson: "",
            teacherId: "",
            teacherName: "",
          }),
          wednesday: Array(6).fill({
            lesson: "",
            teacherId: "",
            teacherName: "",
          }),
          thursday: Array(6).fill({
            lesson: "",
            teacherId: "",
            teacherName: "",
          }),
          friday: Array(6).fill({ lesson: "", teacherId: "", teacherName: "" }),
        },
        errors: {},
        isSubmitting: false,
      };
    }
    default:
      return state;
  }
}

export default function useScheduleFormReducer() {
  return useReducer(scheduleFormReducer, initialState);
}
