import { useState } from "react";

import {
  Card,
  Title,
} from "@mantine/core";

import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Upload,
  message,
} from "antd";

import {
  UploadOutlined,
} from "@ant-design/icons";

import api from "../../api/axios";

import type {
  Homework,
  Schedule,
} from "../../types";

interface Props {
  homework: Homework[];
  schedule: Schedule[];
  onReload: () => void;
}

function TeacherHomework({
  homework,
  schedule,
  onReload,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const [form] = Form.useForm();

  const [file, setFile] =
    useState<File | null>(null);

  const handleCreate =
    async () => {
      try {
        const values =
          await form.validateFields();

        const data =
          new FormData();

        data.append(
          "schedule_id",
          values.schedule_id
        );

        data.append(
          "description",
          values.description
        );

        if (file) {
          data.append(
            "file",
            file
          );
        }

        await api.post(
          "/api/homework/",
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        message.success(
          "Домашнее задание добавлено"
        );

        setOpen(false);

        form.resetFields();

        setFile(null);

        onReload();
      } catch (e) {
        console.error(e);

        message.error(
          "Ошибка сохранения"
        );
      }
    };

  return (
    <Card
      shadow="sm"
      withBorder
      radius="md"
      p="lg"
    >
      <Title
        order={4}
        mb="md"
      >
        📚 Мои домашние задания
      </Title>

      <Button
        type="primary"
        onClick={() =>
          setOpen(true)
        }
        style={{
          marginBottom: 15,
        }}
      >
        Добавить домашнее задание
      </Button>

      <Table
        rowKey="id"
        size="small"
        pagination={{
          pageSize: 5,
          hideOnSinglePage: true,
        }}
        dataSource={homework}
        columns={[
          {
            title: "Предмет",
            render: (
              _: unknown,
              record: Homework
            ) =>
              record.schedule
                .subject.name,
          },
          {
            title: "Описание",
            dataIndex:
              "description",
            ellipsis: true,
          },
          {
            title: "Файл",
            render: (
              _: unknown,
              record: Homework
            ) =>
              record.file ? (
                <a
                  href={
                    record.file
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Скачать
                </a>
              ) : (
                "-"
              ),
          },
          {
            title: "Дата",
            dataIndex:
              "created_at",
            render: (
              value: string
            ) =>
              new Date(
                value
              ).toLocaleDateString(),
          },
        ]}
      />

      <Modal
        open={open}
        title="Добавить домашнее задание"
        onCancel={() =>
          setOpen(false)
        }
        onOk={handleCreate}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="Урок"
            name="schedule_id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={schedule.map(
                (s) => ({
                  value: s.id,
                  label: `${s.subject.name} • ${s.school_class.name}`,
                })
              )}
            />
          </Form.Item>

          <Form.Item
            label="Описание"
            name="description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea
              rows={4}
            />
          </Form.Item>

          <Form.Item label="Файл">
            <Upload
              beforeUpload={(
                file
              ) => {
                setFile(file);

                return false;
              }}
              maxCount={1}
            >
              <Button
                icon={
                  <UploadOutlined />
                }
              >
                Выбрать файл
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default TeacherHomework;