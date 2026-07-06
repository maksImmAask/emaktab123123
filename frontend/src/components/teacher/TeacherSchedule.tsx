import { Card, Title } from "@mantine/core";
import { Table } from "antd";

import type { Schedule } from "../../types";

interface Props {
  schedule: Schedule[];
}

function TeacherSchedule({
  schedule,
}: Props) {
  return (
    <Card
      shadow="sm"
      withBorder
      radius="md"
      p="lg"
    >
      <Title order={4} mb="md">
        📅 Сегодняшние уроки
      </Title>

      <Table
        rowKey="id"
        pagination={false}
        size="small"
        dataSource={schedule}
        columns={[
          {
            title: "Урок",
            dataIndex: "lesson_number",
            width: 80,
          },
          {
            title: "Класс",
            render: (_: unknown, record: Schedule) =>
              record.school_class.name,
          },
          {
            title: "Предмет",
            render: (_: unknown, record: Schedule) =>
              record.subject.name,
          },
          {
            title: "День",
            dataIndex: "weekday",
          },
        ]}
      />
    </Card>
  );
}

export default TeacherSchedule;