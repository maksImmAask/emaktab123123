import { Layout, Menu } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
  ReadOutlined,
  FileTextOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: 16,
            fontSize: 18,
          }}
        >
          School Admin
        </div>

        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => navigate(key)}
          items={[
            { key: "/dashboard/students", icon: <UserOutlined />, label: "Students" },
            { key: "/dashboard/teachers", icon: <TeamOutlined />, label: "Teachers" },
            { key: "/dashboard/classes", icon: <BookOutlined />, label: "Classes" },
            { key: "/dashboard/subjects", icon: <ReadOutlined />, label: "Subjects" },
            { key: "/dashboard/schedule", icon: <CalendarOutlined />, label: "Schedule" },
            { key: "/dashboard/homework", icon: <FileTextOutlined />, label: "Homework" },
            { key: "/dashboard/grades", icon: <CheckSquareOutlined />, label: "Grades" },
            { key: "/dashboard/attendance", icon: <CheckSquareOutlined />, label: "Attendance" },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff" }}>
          Dashboard
        </Header>

        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;