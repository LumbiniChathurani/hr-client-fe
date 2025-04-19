import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />

          {/* ✅ Admin layout wrapper route */}
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="payroll" element={<PayrollPage />} />
            <Route path="leave" element={<LeavePage />} />
            <Route path="recruitment" element={<RecruitmentPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="user_management" element={<UserRolePage />} />

            {/* Add more nested admin routes here */}
          </Route>

          <Route path="*" element={<NoSuchPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
