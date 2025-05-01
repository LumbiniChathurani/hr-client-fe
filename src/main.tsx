import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import NoSuchPage from "./pages/NoSuchPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import { ThemeProvider } from "./context/ThemeProvider";
import EmployeesPage from "./pages/EmployeesPage.tsx";
import PayrollPage from "./pages/PayrollPage.tsx";
import LeavePage from "./pages/LeavePage.tsx";
import RecruitmentPage from "./pages/RecruitmentPage.tsx";
import ReportsPage from "./pages/ReportsPage.tsx";
import UserRolePage from "./pages/UseRolePage.tsx";
import { ToastContainer, toast } from "react-toastify";
// ✅ Inline wrapper to provide `user` to AdminLayout
const AdminLayoutWithUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // if (!user) return <div>Loading user...</div>; // or redirect to login

  return (
    <AdminLayout user={{ profile_image: "localhost:3000/uploads/121.jpg" }} />
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ✅ Protected admin routes using inline AdminLayoutWithUser */}
          <Route path="/" element={<AdminLayoutWithUser />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="payroll" element={<PayrollPage />} />
            <Route path="leave" element={<LeavePage />} />
            <Route path="recruitment" element={<RecruitmentPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="user_management" element={<UserRolePage />} />
          </Route>

          <Route path="*" element={<NoSuchPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    <ToastContainer />
  </StrictMode>
);
