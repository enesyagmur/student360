import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/mainLayout/MainLayout";
import TeacherManagementPage from "./pages/manager/TeacherManagementPage";
import LandingPage from "./pages/landing/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<MainLayout />}>
          <Route path="teacherManagement" element={<TeacherManagementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
