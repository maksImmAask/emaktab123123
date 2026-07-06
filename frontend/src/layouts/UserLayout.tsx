import {
  AppShell,
  Button,
  Group,
  Text,
} from "@mantine/core";

import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useAuthStore } from "../store/authStore";

function UserLayout() {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const handleLogout = () => {
    logout();

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    navigate("/login");
  };

  return (
    <AppShell
      header={{ height: 70 }}
      padding="md"
    >
      <AppShell.Header
        px="xl"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text fw={700} size="xl">
          eMaktab
        </Text>

        <Group>
          <Text fw={500}>
            {user?.username}
          </Text>

          <Button
            color="red"
            variant="light"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default UserLayout;