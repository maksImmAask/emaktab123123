import { Card, Title } from "@mantine/core";
import { Table } from "antd";

import type { Homework } from "../../types";

interface Props {
  homework: Homework[];
}

function TeacherHomework({
  homework,
}: Props) {
  return (
    <Card
      shadow="sm"
      withBorder
      radius="md"
      p="lg"
    >
      <Title order={4} mb="md">
        📚 Мои домашние задания
      </Title>

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
            render: (_: unknown, record: Homework) =>
              record.schedule.subject.name,
          },
          {
            title: "Описание",
            dataIndex: "description",
            ellipsis: true,
          },
          {
            title: "Дата",
            dataIndex: "created_at",
            render: (value: string) =>
              new Date(value).toLocaleDateString(),
          },
        ]}
      />
    </Card>
  );
}

export default TeacherHomework;