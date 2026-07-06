import { create } from "zustand";

export type UserRole =
  | "admin"
  | "director"
  | "teacher"
  | "student";

export interface User {
  id: number;
  username: string;
  role: UserRole;
}

interface AuthState {
  access: string | null;
  refresh: string | null;
  user: User | null;

  login: (
    access: string,
    refresh: string,
    user: User
  ) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  user: JSON.parse(localStorage.getItem("user") ?? "null") as User | null,

  login: (access, refresh, user) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    set({
      access,
      refresh,
      user,
    });
  },

  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    set({
      access: null,
      refresh: null,
      user: null,
    });
  },
}));