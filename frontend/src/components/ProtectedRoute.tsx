import { Navigate } from "react-router-dom";
import { useAuthStore, type UserRole } from "../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles: UserRole[];
}

function ProtectedRoute({
  children,
  roles,
}: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/dashboard" replace />;

      case "student":
        return <Navigate to="/student" replace />;

      case "teacher":
        return <Navigate to="/teacher" replace />;

      case "director":
        return <Navigate to="/director" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
}

export default ProtectedRoute;