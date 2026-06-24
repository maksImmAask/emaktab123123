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
import { useCallback, useEffect, useState } from "react";

import api from "../api/axios";
import type { Subject } from "../types";
import { unwrapList } from "../utils/unwrapList";

function Subjects() {
  const [data, setData] = useState<Subject[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Subject | null>(null);

  const [form] = Form.useForm();

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const loadData = useCallback(async () => {
    try {
      const res = await api.get("/api/subjects/");
      setData(unwrapList<Subject>(res.data));
    } catch {
      message.error("Ошибка загрузки");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const openEdit = (record: Subject) => {
    setEditing(record);
    form.setFieldsValue({
      name: record.name,
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editing) {
        await api.patch(
          `/api/subjects/${editing.id}/`,
          values
        );
        message.success("Обновлено");
      } else {
        await api.post("/api/subjects/", values);
        message.success("Создано");
      }

      setOpen(false);
      loadData();
    } catch {
      message.error("Ошибка сохранения");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/subjects/${id}/`);
      message.success("Удалено");
      loadData();
    } catch {
      message.error("Ошибка удаления");
    }
  };

  return (
    <>
      {isAdmin && (
        <Button
          type="primary"
          onClick={openCreate}
          style={{ marginBottom: 16 }}
        >
          Добавить предмет
        </Button>
      )}

      <Table<Subject>
        rowKey="id"
        dataSource={data}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Actions",
            render: (_, record) =>
              isAdmin ? (
                <Space>
                  <Button
                    onClick={() => openEdit(record)}
                  >
                    Edit
                  </Button>

                  <Popconfirm
                    title="Удалить?"
                    onConfirm={() =>
                      handleDelete(record.id)
                    }
                  >
                    <Button danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </Space>
              ) : null,
          },
        ]}
      />

      <Modal
        open={open}
        title={
          editing ? "Edit subject" : "Add subject"
        }
        onOk={handleSubmit}
        onCancel={() => setOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Subject name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Subjects;