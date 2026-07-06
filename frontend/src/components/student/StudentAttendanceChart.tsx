import { Card, Title } from "@mantine/core";
import { BarChart } from "@mantine/charts";

interface Props {
  present: number;
  late: number;
  absent: number;
}

function StudentAttendanceChart({
  present,
  late,
  absent,
}: Props) {
  const data = [
    {
      status: "Присутствовал",
      value: present,
    },
    {
      status: "Опоздал",
      value: late,
    },
    {
      status: "Отсутствовал",
      value: absent,
    },
  ];

  return (
    <Card
      shadow="sm"
      withBorder
      radius="md"
      p="lg"
    >
      <Title order={4} mb="md">
        📈 Посещаемость
      </Title>

      <BarChart
        h={320}
        data={data}
        dataKey="status"
        series={[
          {
            name: "value",
            color: "blue",
          },
        ]}
        withLegend={false}
        gridAxis="xy"
        tickLine="y"
      />
    </Card>
  );
}

export default StudentAttendanceChart;