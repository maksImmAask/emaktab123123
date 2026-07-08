/* eslint-disable react-hooks/set-state-in-effect */
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  message,
} from "antd";
import { useCallback, useEffect, useState } from "react";

import api from "../api/axios";
import type {
  Student,
  SchoolClass,
} from "../types";
import { unwrapList } from "../utils/unwrapList";

function Students() {
  const [data, setData] =
    useState<Student[]>([]);

  const [classes, setClasses] =
    useState<SchoolClass[]>([]);

  const [open, setOpen] =
    useState(false);

  const [editing, setEditing] =
    useState<Student | null>(null);

  const [form] = Form.useForm();

  const loadData = useCallback(async () => {
    try {
      const [s, c] =
        await Promise.all([
          api.get("/api/students/"),
          api.get("/api/classes/"),
        ]);

      setData(
        unwrapList<Student>(s.data)
      );

      setClasses(
        unwrapList<SchoolClass>(c.data)
      );
    } catch {
      message.error(
        "Ошибка загрузки"
      );
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
    record: Student
  ) => {
    setEditing(record);

    form.setFieldsValue({
      username:
        record.username,
      school_class_id:
        record.school_class
          ?.id,
    });

    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values =
        await form.validateFields();

      const payload = {
        username:
          values.username,
        school_class_id:
          values.school_class_id,
      };

      if (editing) {
        await api.patch(
          `/api/students/${editing.id}/`,
          payload
        );

        message.success(
          "Обновлено"
        );
      } else {
        await api.post(
          "/api/students/",
          payload
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
        `/api/students/${id}/`
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
        Добавить студента
      </Button>

      <Table<Student>
        rowKey="id"
        dataSource={data}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Username",
            dataIndex:
              "username",
          },
          {
            title: "Class",
            render: (_, r) =>
              r.school_class
                ?.name ?? "—",
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
            ? "Edit student"
            : "Add student"
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

          <Form.Item
            name="school_class_id"
            label="Class"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={classes.map(
                (c) => ({
                  value: c.id,
                  label: c.name,
                })
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Students;