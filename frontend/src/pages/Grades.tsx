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
import type { Grade, Student, Subject, Teacher } from "../types";
import { unwrapList } from "../utils/unwrapList";

function Grades() {
  const [data, setData] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Grade | null>(null);

  const [form] = Form.useForm();

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const loadData = useCallback(async () => {
    try {
      const [g, s, sub, t] = await Promise.all([
        api.get("/api/grades/"),
        api.get("/api/students/"),
        api.get("/api/subjects/"),
        api.get("/api/teachers/"),
      ]);

      setData(unwrapList<Grade>(g.data));
      setStudents(unwrapList<Student>(s.data));
      setSubjects(unwrapList<Subject>(sub.data));
      setTeachers(unwrapList<Teacher>(t.data));
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

  const openEdit = (record: Grade) => {
    setEditing(record);

    form.setFieldsValue({
      student_id: record.student.id,
      subject_id: record.subject.id,
      teacher_id: record.teacher.id,
      value: record.value,
    });

    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        student_id: values.student_id,
        subject_id: values.subject_id,
        teacher_id: values.teacher_id,
        value: values.value,
      };

      if (editing) {
        await api.patch(`/api/grades/${editing.id}/`, payload);
        message.success("Оценка обновлена");
      } else {
        await api.post("/api/grades/", payload);
        message.success("Оценка добавлена");
      }

      setOpen(false);
      loadData();
    } catch {
      message.error("Ошибка сохранения");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/grades/${id}/`);
      message.success("Удалено");
      loadData();
    } catch {
      message.error("Ошибка удаления");
    }
  };

  return (
    <>
      {isAdmin && (
        <Button type="primary" onClick={openCreate} style={{ marginBottom: 16 }}>
          Добавить оценку
        </Button>
      )}

      <Table<Grade>
        rowKey="id"
        dataSource={data}
        columns={[
          {
            title: "Student",
            render: (_, r) => r.student.username,
          },
          {
            title: "Subject",
            render: (_, r) => r.subject.name,
          },
          {
            title: "Teacher",
            render: (_, r) => r.teacher.username,
          },
          {
            title: "Value",
            dataIndex: "value",
          },
          {
            title: "Date",
            dataIndex: "date",
          },
          {
            title: "Actions",
            render: (_, record) =>
              isAdmin ? (
                <Space>
                  <Button onClick={() => openEdit(record)}>Edit</Button>

                  <Popconfirm
                    title="Удалить?"
                    onConfirm={() => handleDelete(record.id)}
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                </Space>
              ) : null,
          },
        ]}
      />

      <Modal
        open={open}
        title={editing ? "Edit grade" : "Add grade"}
        onOk={handleSubmit}
        onCancel={() => setOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="student_id" label="Student" rules={[{ required: true }]}>
            <Select options={students.map(s => ({ value: s.id, label: s.username }))} />
          </Form.Item>

          <Form.Item name="subject_id" label="Subject" rules={[{ required: true }]}>
            <Select options={subjects.map(s => ({ value: s.id, label: s.name }))} />
          </Form.Item>

          <Form.Item name="teacher_id" label="Teacher" rules={[{ required: true }]}>
            <Select options={teachers.map(t => ({ value: t.id, label: t.username }))} />
          </Form.Item>

          <Form.Item name="value" label="Grade" rules={[{ required: true }]}>
            <InputNumber min={1} max={5} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Grades;