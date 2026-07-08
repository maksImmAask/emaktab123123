import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
} from "antd";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";
import type { Teacher } from "../types";
import { unwrapList } from "../utils/unwrapList";

function Teachers() {
  const [data, setData] =
    useState<Teacher[]>([]);

  const [open, setOpen] =
    useState(false);

  const [editing, setEditing] =
    useState<Teacher | null>(null);

  const [form] = Form.useForm();

  const loadData = useCallback(async () => {
    try {
      const res = await api.get(
        "/api/teachers/"
      );

      setData(
        unwrapList<Teacher>(res.data)
      );
    } catch {
      message.error(
        "Ошибка загрузки"
      );
    }
  }, []);

  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const openEdit = (
    record: Teacher
  ) => {
    setEditing(record);

    form.setFieldsValue({
      username: record.username,
    });

    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values =
        await form.validateFields();

      if (editing) {
        await api.patch(
          `/api/teachers/${editing.id}/`,
          values
        );

        message.success(
          "Обновлено"
        );
      } else {
        await api.post(
          "/api/teachers/",
          values
        );

        message.success(
          "Создано"
        );
      }

      setOpen(false);

      loadData();
    } catch {
      message.error(
        "Ошибка сохранения"
      );
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    try {
      await api.delete(
        `/api/teachers/${id}/`
      );

      message.success(
        "Удалено"
      );

      loadData();
    } catch {
      message.error(
        "Ошибка удаления"
      );
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={openCreate}
        style={{
          marginBottom: 16,
        }}
      >
        Добавить учителя
      </Button>

      <Table<Teacher>
        rowKey="id"
        dataSource={data}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Username",
            dataIndex: "username",
          },
          {
            title: "Actions",
            render: (
              _,
              record
            ) => (
              <Space>
                <Button
                  onClick={() =>
                    openEdit(
                      record
                    )
                  }
                >
                  Edit
                </Button>

                <Popconfirm
                  title="Удалить?"
                  onConfirm={() =>
                    handleDelete(
                      record.id
                    )
                  }
                >
                  <Button danger>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        open={open}
        title={
          editing
            ? "Edit teacher"
            : "Add teacher"
        }
        onOk={handleSubmit}
        onCancel={() =>
          setOpen(false)
        }
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Teachers;