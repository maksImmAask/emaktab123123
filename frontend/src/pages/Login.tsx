import { Button, Card, Form, Input, message } from "antd";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  username: string;
  password: string;
}

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: LoginForm) => {
    try {
      const response = await api.post(
        "/api/auth/login/",
        values
      );

      console.log("FULL RESPONSE:", response.data);
      console.log("USER:", response.data.user);
      console.log("ROLE:", response.data.user?.role);

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      if (response.data.user) {
        localStorage.setItem(
          "role",
          response.data.user.role
        );

        localStorage.setItem(
          "username",
          response.data.user.username
        );
      }

      console.log(
        "ROLE FROM LOCALSTORAGE:",
        localStorage.getItem("role")
      );

      message.success("Вход выполнен");

      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
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
      <Card title="Вход" style={{ width: 400 }}>
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