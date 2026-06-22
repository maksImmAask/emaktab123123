import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";

function MainLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <Header />

      <div style={{ padding: 20 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;