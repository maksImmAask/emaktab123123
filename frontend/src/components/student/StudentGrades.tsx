import { Card, Title } from "@mantine/core";
import { Table, Tag } from "antd";

import type { Grade } from "../../types";

interface Props {
  grades: Grade[];
}

function StudentGrades({ grades }: Props) {
  return (
    <Card
      shadow="sm"
      withBorder
      radius="md"
      p="lg"
    >
      <Title order={4} mb="md">
        📝 Последние оценки
      </Title>

      <Table
        rowKey="id"
        size="small"
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
        }}
        dataSource={grades}
        columns={[
          {
        title: "Класс",
        render: (_: unknown, record: Grade) =>
            record.schedule.school_class.name,
        },
        {
        title: "Предмет",
        render: (_: unknown, record: Grade) =>
            record.schedule.subject.name,
        },
          {
            title: "Оценка",
            dataIndex: "value",
            align: "center",
            render: (value: number) => {
              let color = "red";

              if (value >= 4) {
                color = "green";
              } else if (value === 3) {
                color = "gold";
              }

              return (
                <Tag color={color}>
                  {value}
                </Tag>
              );
            },
          },
          {
            title: "Учитель",
            render: (_: unknown, record: Grade) =>
              record.teacher.username,
          },
          {
            title: "Дата",
            dataIndex: "date",
            render: (value: string) =>
              new Date(value).toLocaleDateString(),
          },
        ]}
      />
    </Card>
  );
}

export default StudentGrades;