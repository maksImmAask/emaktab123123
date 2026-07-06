import { Card, Title } from "@mantine/core";
import { Table } from "antd";

interface Student {
  id: number;
  username: string;
  school_class: {
    id: number;
    name: string;
  } | null;
}

interface Props {
  students: Student[];
}

function DirectorStudents({
  students,
}: Props) {
  return (
    <Card withBorder shadow="sm" p="lg">
      <Title order={4} mb="md">
        👨‍🎓 Ученики
      </Title>

      <Table
        rowKey="id"
        pagination={{ pageSize: 8 }}
        dataSource={students}
        columns={[
          {
            title: "Username",
            dataIndex: "username",
          },
          {
            title: "Класс",
            render: (_, record) =>
              record.school_class?.name ?? "—",
          },
        ]}
      />
    </Card>
  );
}

export default DirectorStudents;