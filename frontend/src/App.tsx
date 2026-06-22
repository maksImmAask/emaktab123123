import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Subjects from "./pages/Subjects";
import Schedule from "./pages/Schedule";
import Homework from "./pages/Homework";
import Grades from "./pages/Grades";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* MAIN LAYOUT */}
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="classes" element={<Classes />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="homework" element={<Homework />} />
        <Route path="grades" element={<Grades />} />
        <Route path="attendance" element={<Attendance />} />
      </Route>

      {/* redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;