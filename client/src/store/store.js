import { configureStore } from "@reduxjs/toolkit";
import managerSlice from "../features/manager/managerSlice";
import teacherSlice from "../features/teacher/teacherSlice";
import classSlice from "../features/class/classSlice";
import lessonSlice from "../features/lesson/lessonSlice";
import studentSlice from "../features/student/studentSlice";
import announcementSlice from "../features/announcement/announcementSlice";
import examSlice from "../features/exam/examSlice";
import scheduleSlice from "../features/schedule/scheduleSlice";

const store = configureStore({
  reducer: {
    managerState: managerSlice,
    teacherState: teacherSlice,
    classState: classSlice,
    lessonState: lessonSlice,
    studentState: studentSlice,
    announcementState: announcementSlice,
    examState: examSlice,
    scheduleState: scheduleSlice,
  },
});

export default store;
