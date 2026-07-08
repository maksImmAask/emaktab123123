import { Navigate } from "react-router-dom";
import {
  useAuthStore,
  type UserRole,
} from "../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles: UserRole[];
}

const roleRoutes: Record<UserRole, string> = {
  admin: "/dashboard",
  teacher: "/teacher",
  student: "/student",
  director: "/director",
};

function ProtectedRoute({
  children,
  roles,
}: ProtectedRouteProps) {
  const user = useAuthStore(
    (state) => state.user
  );

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (!roles.includes(user.role)) {
    return (
      <Navigate
        to={roleRoutes[user.role]}
        replace
      />
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;