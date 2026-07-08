import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  Space,
  Popconfirm,
  message,
} from "antd";
import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";

import api from "../api/axios";
import type {
  Attendance,
  Student,
  Schedule,
} from "../types";
import { unwrapList } from "../utils/unwrapList";

function AttendancePage() {
  const [data, setData] = useState<Attendance[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] =
    useState<Attendance | null>(null);

  const [form] = Form.useForm();

  const loadData = useCallback(async () => {
    try {
      const [
        attendanceRes,
        studentsRes,
        schedulesRes,
      ] = await Promise.all([
        api.get("/api/attendance/"),
        api.get("/api/students/"),
        api.get("/api/schedules/"),
      ]);

      setData(unwrapList(attendanceRes.data));
      setStudents(unwrapList(studentsRes.data));
      setSchedules(unwrapList(schedulesRes.data));
    } catch {
      message.error("Ошибка загрузки данных");
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

  const openEdit = (record: Attendance) => {
    setEditing(record);

    form.setFieldsValue({
      student_id: record.student.id,
      schedule_id: record.schedule.id,
      date: dayjs(record.date),
      status: record.status,
    });

    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values =
        await form.validateFields();

      const payload = {
        student_id: values.student_id,
        schedule_id: values.schedule_id,
        date: values.date.format(
          "YYYY-MM-DD"
        ),
        status: values.status,
      };

      if (editing) {
        await api.patch(
          `/api/attendance/${editing.id}/`,
          payload
        );

        message.success(
          "Посещаемость обновлена"
        );
      } else {
        await api.post(
          "/api/attendance/",
          payload
        );

        message.success(
          "Посещаемость создана"
        );
      }

      setOpen(false);
      loadData();
    } catch {
      message.error("Ошибка сохранения");
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    try {
      await api.delete(
        `/api/attendance/${id}/`
      );

      message.success("Удалено");

      loadData();
    } catch {
      message.error("Ошибка удаления");
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={openCreate}
        style={{ marginBottom: 16 }}
      >
        Добавить посещаемость
      </Button>

      <Table<Attendance>
        dataSource={data}
        rowKey="id"
        columns={[
          {
            title: "Student",
            render: (_, r) =>
              r.student.username,
          },
          {
            title: "Class",
            render: (_, r) =>
              r.student.school_class
                ?.name ?? "—",
          },
          {
            title: "Date",
            dataIndex: "date",
          },
          {
            title: "Status",
            dataIndex: "status",
          },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button
                  onClick={() =>
                    openEdit(record)
                  }
                >
                  Edit
                </Button>

                <Popconfirm
                  title="Удалить запись?"
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
            ? "Редактировать посещаемость"
            : "Добавить посещаемость"
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
            name="student_id"
            label="Student"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={students.map(
                (s) => ({
                  value: s.id,
                  label: s.username,
                })
              )}
            />
          </Form.Item>

          <Form.Item
            name="schedule_id"
            label="Schedule"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={schedules.map(
                (s) => ({
                  value: s.id,
                  label: `Lesson ${s.lesson_number}`,
                })
              )}
            />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "present",
                  label:
                    "Present",
                },
                {
                  value: "absent",
                  label:
                    "Absent",
                },
                {
                  value: "late",
                  label: "Late",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AttendancePage;