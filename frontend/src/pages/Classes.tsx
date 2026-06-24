/* eslint-disable react-hooks/set-state-in-effect */
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
import type { SchoolClass } from "../types";
import { unwrapList } from "../utils/unwrapList";

function Classes() {
  const [data, setData] = useState<SchoolClass[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<SchoolClass | null>(null);

  const [form] = Form.useForm();

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const loadData = useCallback(async () => {
    try {
      const res = await api.get("/api/classes/");

      setData(
        unwrapList<SchoolClass>(res.data)
      );
    } catch {
      message.error("Ошибка загрузки");
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const openEdit = (
    record: SchoolClass
  ) => {
    setEditing(record);

    form.setFieldsValue({
      name: record.name,
    });

    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values =
        await form.validateFields();

      if (editing) {
        await api.patch(
          `/api/classes/${editing.id}/`,
          values
        );

        message.success(
          "Класс обновлён"
        );
      } else {
        await api.post(
          "/api/classes/",
          values
        );

        message.success(
          "Класс создан"
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
        `/api/classes/${id}/`
      );

      message.success("Удалено");

      loadData();
    } catch {
      message.error(
        "Ошибка удаления"
      );
    }
  };

  return (
    <>
      {isAdmin && (
        <Button
          type="primary"
          onClick={openCreate}
          style={{
            marginBottom: 16,
          }}
        >
          Добавить класс
        </Button>
      )}

      <Table<SchoolClass>
        dataSource={data}
        rowKey="id"
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Название",
            dataIndex: "name",
          },
          {
            title: "Действия",
            render: (_, record) =>
              isAdmin ? (
                <Space>
                  <Button
                    onClick={() =>
                      openEdit(record)
                    }
                  >
                    Edit
                  </Button>

                  <Popconfirm
                    title="Удалить класс?"
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
              ) : null,
          },
        ]}
      />

      <Modal
        open={open}
        title={
          editing
            ? "Редактировать класс"
            : "Создать класс"
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
            name="name"
            label="Название класса"
            rules={[
              {
                required: true,
                message:
                  "Введите название",
              },
            ]}
          >
            <Input
              placeholder="11A"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Classes;