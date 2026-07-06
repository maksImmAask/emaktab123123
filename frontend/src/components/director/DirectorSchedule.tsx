import { Card, Title } from "@mantine/core";
import { Table } from "antd";

interface Schedule {
  id: number;

  school_class: {
    name: string;
  };

  subject: {
    name: string;
  };

  teacher: {
    username: string;
  };

  weekday: number;
  lesson_number: number;
}

interface Props {
  schedule: Schedule[];
}

function DirectorSchedule({
  schedule,
}: Props) {
  const getDay = (
    weekday: number
  ) => {
    const days: Record<number, string> = {
      1: "Пн",
      2: "Вт",
      3: "Ср",
      4: "Чт",
      5: "Пт",
      6: "Сб",
    };

    return days[weekday];
  };

  return (
    <Card
      withBorder
      shadow="sm"
      p="lg"
    >
      <Title order={4} mb="md">
        📅 Расписание
      </Title>

      <Table
        rowKey="id"
        pagination={{
          pageSize: 8,
        }}
        dataSource={schedule}
        columns={[
          {
            title: "Класс",
            render: (_, record) =>
              record.school_class.name,
          },
          {
            title: "Предмет",
            render: (_, record) =>
              record.subject.name,
          },
          {
            title: "Учитель",
            render: (_, record) =>
              record.teacher.username,
          },
          {
            title: "День",
            render: (_, record) =>
              getDay(record.weekday),
          },
          {
            title: "Урок",
            dataIndex: "lesson_number",
          },
        ]}
      />
    </Card>
  );
}

export default DirectorSchedule;