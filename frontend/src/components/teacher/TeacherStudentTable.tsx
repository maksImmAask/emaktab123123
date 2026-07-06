import { Card, Title } from "@mantine/core";
import { Select, Table } from "antd";

import type { TeacherStudent } from "../../types";

interface Props {
  students: TeacherStudent[];

  onGradeChange: (
    id: number,
    value: number
  ) => void;

  onAttendanceChange: (
    id: number,
    value: TeacherStudent["attendance"]
  ) => void;
}

function TeacherStudentTable({
  students,
  onGradeChange,
  onAttendanceChange,
}: Props) {
  return (
    <Card
      shadow="sm"
      withBorder
      radius="md"
      p="lg"
    >
      <Title order={4} mb="md">
        👨‍🎓 Ученики
      </Title>

      <Table
        rowKey="id"
        pagination={false}
        dataSource={students}
        columns={[
          {
            title: "Ученик",
            dataIndex: "username",
          },
          {
            title: "Оценка",
            render: (_: unknown, record: TeacherStudent) => (
              <Select<number>
                style={{ width: 90 }}
                value={record.grade}
                onChange={(value) =>
                  onGradeChange(record.id, value)
                }
                options={[
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" },
                  { value: 5, label: "5" },
                ]}
              />
            ),
          },
          {
            title: "Посещаемость",
            render: (_: unknown, record: TeacherStudent) => (
              <Select<TeacherStudent["attendance"]>
                style={{ width: 170 }}
                value={record.attendance}
                onChange={(value) =>
                  onAttendanceChange(record.id, value)
                }
                options={[
                  {
                    value: "present",
                    label: "Присутствовал",
                  },
                  {
                    value: "late",
                    label: "Опоздал",
                  },
                  {
                    value: "absent",
                    label: "Отсутствовал",
                  },
                ]}
              />
            ),
          },
        ]}
      />
    </Card>
  );
}

export default TeacherStudentTable;