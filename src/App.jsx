import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManagerLayout from "./components/layout/managerLayout/ManagerLayout";
import TeacherManagementPage from "./pages/manager/TeacherManagementPage";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<MainLayout />}>
          <Route path="manager" element={<ManagerLayout />}>
            <Route
              path="teacherManagement"
              element={<TeacherManagementPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
