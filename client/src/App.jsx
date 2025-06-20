import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManagerLayout from "./components/layout/managerLayout/ManagerLayout";
import TeacherManagementPage from "./pages/manager/TeacherManagementPage";
import ManagerDashboardPage from "./pages/manager/ManagerDashboardPage";
import ExamManagementPage from "./pages/manager/ExamManagementPage";
import LessonManagementPage from "./pages/manager/LessonManagementPage";
import ClassManagementPage from "./pages/manager/ClassManagementPage";
import ManagerManagementPage from "./pages/manager/ManagerManagementPage";
import StudentManagementPage from "./pages/manager/StudentManagementPage";
import ScheduleManagementPage from "./pages/manager/ScheduleManagementPage";
import LoginPage from "./pages/auth/LoginPage";
import SettingsPage from "./pages/shared/SettingsPage";
import AnnouncementManagementPage from "./pages/manager/AnnouncementManagementPage";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/manager" element={<ManagerLayout />}>
            <Route path="teachers" element={<TeacherManagementPage />} />
            <Route path="dashboard" element={<ManagerDashboardPage />} />
            <Route path="exams" element={<ExamManagementPage />} />
            <Route path="lessons" element={<LessonManagementPage />} />
            <Route path="classes" element={<ClassManagementPage />} />

            <Route path="managers" element={<ManagerManagementPage />} />

            <Route path="students" element={<StudentManagementPage />} />
            <Route path="schedule" element={<ScheduleManagementPage />} />
            <Route
              path="announcements"
              element={<AnnouncementManagementPage />}
            />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
