import { Card, Title } from "@mantine/core";
import { Badge, Table } from "antd";

interface Attendance {
  id: number;

  student: {
    username: string;
  };

  schedule: {
    subject: {
      name: string;
    };
  };

  status: string;

  date: string;
}

interface Props {
  attendance: Attendance[];
}

function DirectorAttendance({
  attendance,
}: Props) {
  const getColor = (
    status: string
  ) => {
    switch (status) {
      case "present":
        return "green";

      case "late":
        return "orange";

      default:
        return "red";
    }
  };

  const getText = (
    status: string
  ) => {
    switch (status) {
      case "present":
        return "Присутствовал";

      case "late":
        return "Опоздал";

      default:
        return "Отсутствовал";
    }
  };

  return (
    <Card
      withBorder
      shadow="sm"
      p="lg"
    >
      <Title order={4} mb="md">
        ✅ Посещаемость
      </Title>

      <Table
        rowKey="id"
        pagination={{
          pageSize: 8,
        }}
        dataSource={attendance}
        columns={[
          {
            title: "Ученик",
            render: (_, record) =>
              record.student.username,
          },
          {
            title: "Предмет",
            render: (_, record) =>
              record.schedule.subject.name,
          },
          {
            title: "Статус",
            render: (_, record) => (
              <Badge
                color={getColor(
                  record.status
                )}
              >
                {getText(
                  record.status
                )}
              </Badge>
            ),
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

export default DirectorAttendance;