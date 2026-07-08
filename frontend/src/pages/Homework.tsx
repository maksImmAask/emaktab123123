import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Upload,
  Space,
  Popconfirm,
  message,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import type { UploadFile } from "antd";

import api from "../api/axios";
import type {
  Homework,
  Schedule,
} from "../types";
import { unwrapList } from "../utils/unwrapList";

function HomeworkPage() {
  const [data, setData] = useState<Homework[]>([]);
  const [schedules, setSchedules] =
    useState<Schedule[]>([]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] =
    useState<Homework | null>(null);

  const [fileList, setFileList] =
    useState<UploadFile[]>([]);

  const [form] = Form.useForm();

  const loadData = useCallback(async () => {
    try {
      const [h, s] = await Promise.all([
        api.get("/api/homework/"),
        api.get("/api/schedules/"),
      ]);

      setData(
        unwrapList<Homework>(h.data)
      );

      setSchedules(
        unwrapList<Schedule>(s.data)
      );
    } catch {
      message.error("Ошибка загрузки");
    }
  }, []);

  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setFileList([]);
    setOpen(true);
  };

  const openEdit = (
    record: Homework
  ) => {
    setEditing(record);

    form.setFieldsValue({
      schedule_id:
        record.schedule.id,
      description:
        record.description,
    });

    setFileList([]);

    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values =
        await form.validateFields();

      const formData =
        new FormData();

      formData.append(
        "schedule_id",
        values.schedule_id
      );

      formData.append(
        "description",
        values.description
      );

      if (
        fileList[0]
          ?.originFileObj
      ) {
        formData.append(
          "file",
          fileList[0]
            .originFileObj
        );
      }

      if (editing) {
        await api.patch(
          `/api/homework/${editing.id}/`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        message.success(
          "Обновлено"
        );
      } else {
        await api.post(
          "/api/homework/",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
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
        `/api/homework/${id}/`
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
        Добавить ДЗ
      </Button>

      <Table<Homework>
        rowKey="id"
        dataSource={data}
        columns={[
          {
            title: "Class",
            render: (_, r) =>
              r.schedule
                .school_class
                ?.name ?? "—",
          },
          {
            title: "Subject",
            render: (_, r) =>
              r.schedule
                .subject?.name ??
              "—",
          },
          {
            title: "Teacher",
            render: (_, r) =>
              r.schedule
                .teacher
                ?.username ??
              "—",
          },
          {
            title: "Description",
            dataIndex:
              "description",
          },
          {
            title: "Created",
            dataIndex:
              "created_at",
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
            ? "Edit homework"
            : "Add homework"
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
                  label: `Class ${
                    s.school_class
                      ?.name ?? ""
                  } - ${
                    s.subject
                      ?.name ?? ""
                  }`,
                })
              )}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="File">
            <Upload
              beforeUpload={() =>
                false
              }
              fileList={fileList}
              onChange={({
                fileList,
              }) =>
                setFileList(
                  fileList
                )
              }
            >
              <Button>
                Upload file
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default HomeworkPage;