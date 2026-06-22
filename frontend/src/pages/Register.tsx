import { Button, Card, Form, Input, message } from "antd";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: RegisterForm) => {
    try {
        const response = await api.post(
        "/api/auth/register/",
        values
        );

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      message.success("Регистрация успешна");

      navigate("/dashboard");
    } catch (error) {
        console.log(error)
        message.error("Ошибка регистрации")
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
      <Card title="Регистрация" style={{ width: 450 }}>
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Введите email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Имя"
            name="first_name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Фамилия"
            name="last_name"
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

          <Form.Item
            label="Повторите пароль"
            name="password2"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Повторите пароль",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    getFieldValue("password") === value
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Пароли не совпадают")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Зарегистрироваться
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Register;