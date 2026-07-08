import { Card, Title } from "@mantine/core";
import { Table } from "antd";

interface Grade {
  id: number;

  student: {
    username: string;
  };

  schedule: {
    school_class: {
      name: string;
    };

    subject: {
      name: string;
    };
  };

  teacher: {
    username: string;
  };

  value: number;

  date: string;
}

interface Props {
  grades: Grade[];
}

function DirectorGrades({
  grades,
}: Props) {
  return (
    <Card
      withBorder
      shadow="sm"
      p="lg"
    >
      <Title order={4} mb="md">
        📈 Оценки
      </Title>

      <Table
        rowKey="id"
        pagination={{
          pageSize: 8,
        }}
        dataSource={grades}
        columns={[
          {
            title: "Ученик",
            render: (_, record) =>
              record.student.username,
          },
          {
            title: "Класс",
            render: (_, record) =>
              record.schedule.school_class.name,
          },
          {
            title: "Предмет",
            render: (_, record) =>
              record.schedule.subject.name,
          },
          {
            title: "Учитель",
            render: (_, record) =>
              record.teacher.username,
          },
          {
            title: "Оценка",
            dataIndex: "value",
          },
          {
            title: "Дата",
            render: (_, record) =>
              new Date(
                record.date
              ).toLocaleDateString(),
          },
        ]}
      />
    </Card>
  );
}

export default DirectorGrades;