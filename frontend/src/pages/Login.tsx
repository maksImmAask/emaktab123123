import { Button, Card, Form, Input, message } from "antd";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore, type UserRole } from "../store/authStore";

interface LoginForm {
  username: string;
  password: string;
}

const roleRoutes: Record<UserRole, string> = {
  admin: "/dashboard",
  teacher: "/teacher",
  student: "/student",
  director: "/director",
};

function Login() {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const onFinish = async (values: LoginForm) => {
    try {
      const { data } = await api.post(
        "/api/auth/login/",
        values
      );

      login(
        data.access,
        data.refresh,
        data.user
      );

      message.success("Вход выполнен");

      const role = data.user.role as UserRole;

      navigate(roleRoutes[role], {
        replace: true,
      });
    } catch (error) {
      console.error(error);
      message.error("Ошибка входа");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        title="Вход"
        style={{ width: 400 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Введите username",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: "Введите пароль",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Войти
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;