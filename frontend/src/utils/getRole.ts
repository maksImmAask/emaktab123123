import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  role?: string;
  username?: string;
  exp?: number;
}

export const getRole = (): string | null => {
  const token = localStorage.getItem("access");

  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.role || null;
  } catch (e) {
    console.error(e);
    return null;
  }
};