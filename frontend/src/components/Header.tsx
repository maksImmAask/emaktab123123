import { Button, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div
      style={{
        height: 60,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "1px solid #eee",
      }}
    >
      <h3>School Admin</h3>

      <Space>
        {token ? (
          <>
            <Avatar icon={<UserOutlined />} />
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button type="primary" onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}
      </Space>
    </div>
  );
}

export default Header;