/* eslint-disable react-hooks/set-state-in-effect */
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  InputNumber,
  Space,
  Popconfirm,
  message,
} from "antd";
import { useCallback, useEffect, useState } from "react";

import api from "../api/axios";
import type {
  Schedule,
  SchoolClass,
  Subject,
  Teacher,
} from "../types";
import { unwrapList } from "../utils/unwrapList";

function SchedulePage() {
  const [data, setData] = useState<Schedule[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] =
    useState<Schedule | null>(null);

  const [form] = Form.useForm();

  const loadData = useCallback(async () => {
    try {
      const [s, c, sub, t] =
        await Promise.all([
          api.get("/api/schedules/"),
          api.get("/api/classes/"),
          api.get("/api/subjects/"),
          api.get("/api/teachers/"),
        ]);

      setData(
        unwrapList<Schedule>(s.data)
      );

      setClasses(
        unwrapList<SchoolClass>(c.data)
      );

      setSubjects(
        unwrapList<Subject>(sub.data)
      );

      setTeachers(
        unwrapList<Teacher>(t.data)
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
    record: Schedule
  ) => {
    setEditing(record);

    form.setFieldsValue({
      school_class_id:
        record.school_class.id,
      subject_id:
        record.subject.id,
      teacher_id:
        record.teacher.id,
      weekday:
        record.weekday,
      lesson_number:
        record.lesson_number,
    });

    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values =
        await form.validateFields();

      const payload = {
        school_class_id:
          values.school_class_id,
        subject_id:
          values.subject_id,
        teacher_id:
          values.teacher_id,
        weekday:
          values.weekday,
        lesson_number:
          values.lesson_number,
      };

      if (editing) {
        await api.patch(
          `/api/schedules/${editing.id}/`,
          payload
        );

        message.success(
          "Обновлено"
        );
      } else {
        await api.post(
          "/api/schedules/",
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
        `/api/schedules/${id}/`
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
        Добавить расписание
      </Button>

      <Table<Schedule>
        rowKey="id"
        dataSource={data}
        columns={[
          {
            title: "Class",
            render: (_, r) =>
              r.school_class
                ?.name ?? "—",
          },
          {
            title: "Subject",
            render: (_, r) =>
              r.subject?.name ??
              "—",
          },
          {
            title: "Teacher",
            render: (_, r) =>
              r.teacher
                ?.username ?? "—",
          },
          {
            title: "Weekday",
            dataIndex:
              "weekday",
          },
          {
            title: "Lesson",
            dataIndex:
              "lesson_number",
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
            ? "Edit schedule"
            : "Add schedule"
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

          <Form.Item
            name="subject_id"
            label="Subject"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={subjects.map(
                (s) => ({
                  value: s.id,
                  label: s.name,
                })
              )}
            />
          </Form.Item>

          <Form.Item
            name="teacher_id"
            label="Teacher"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={teachers.map(
                (t) => ({
                  value: t.id,
                  label:
                    t.username,
                })
              )}
            />
          </Form.Item>

          <Form.Item
            name="weekday"
            label="Weekday"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              min={1}
              max={6}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="lesson_number"
            label="Lesson"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              min={1}
              max={10}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default SchedulePage;