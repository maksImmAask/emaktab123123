import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import UserLayout from "./layouts/UserLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import DashboardStats from "./pages/Statictics";

import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Subjects from "./pages/Subjects";
import Schedule from "./pages/Schedule";
import Homework from "./pages/Homework";
import Grades from "./pages/Grades";
import Attendance from "./pages/Attendance";

import StudentDashboard from "./pages/StudentsDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
// import DirectorDashboard from "./pages/DirectorDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import DirectorDashboard from "./pages/DirectorDashboard";

function App() {
  return (
    <Routes>

      {/* AUTH */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= ADMIN ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={["admin"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="stats" element={<DashboardStats />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="classes" element={<Classes />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="homework" element={<Homework />} />
        <Route path="grades" element={<Grades />} />
        <Route path="attendance" element={<Attendance />} />
      </Route>


      <Route
        path="/student"
        element={
          <ProtectedRoute roles={["student"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
      </Route>


      <Route
        path="/teacher"
        element={
          <ProtectedRoute roles={["teacher"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboard />} />
      </Route>


      <Route
        path="/director"
        element={
          <ProtectedRoute roles={["director"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DirectorDashboard />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;