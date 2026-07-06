import { Card, Title } from "@mantine/core";
import { Table } from "antd";

interface Homework {
  id: number;

  schedule: {
    subject: {
      name: string;
    };
  };

  description: string;

  created_at: string;
}

interface Props {
  homework: Homework[];
}

function DirectorHomework({
  homework,
}: Props) {
  return (
    <Card
      withBorder
      shadow="sm"
      p="lg"
    >
      <Title order={4} mb="md">
        📚 Домашние задания
      </Title>

      <Table
        rowKey="id"
        pagination={{
          pageSize: 8,
        }}
        dataSource={homework}
        columns={[
          {
            title: "Предмет",
            render: (_, record) =>
              record.schedule.subject.name,
          },
          {
            title: "Описание",
            dataIndex: "description",
            ellipsis: true,
          },
          {
            title: "Дата",
            render: (_, record) =>
              new Date(
                record.created_at
              ).toLocaleDateString(),
          },
        ]}
      />
    </Card>
  );
}

export default DirectorHomework;