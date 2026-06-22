import { Navigate } from "react-router-dom";
import { getRole } from "../utils/getRole";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const role = getRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
}