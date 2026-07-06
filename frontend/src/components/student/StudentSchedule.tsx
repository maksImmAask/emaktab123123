import { Card, Title } from "@mantine/core";
import { Table } from "antd";

import type { Schedule } from "../../types/student";

interface Props {
  schedule: Schedule[];
}

function StudentSchedule({
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
        📅 Мое расписание
      </Title>

      <Table
        rowKey="id"
        size="small"
        pagination={false}
        dataSource={schedule}
        columns={[
          {
            title: "№",
            dataIndex: "lesson_number",
            width: 70,
          },
          {
            title: "Предмет",
            render: (_: unknown, record: Schedule) =>
              record.subject.name,
          },
          {
            title: "Учитель",
            render: (_: unknown, record: Schedule) =>
              record.teacher.username,
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

export default StudentSchedule;