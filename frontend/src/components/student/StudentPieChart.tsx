import { Card, Title } from "@mantine/core";
import { PieChart } from "@mantine/charts";

interface Props {
  excellent: number;
  average: number;
  bad: number;
}

function StudentPieChart({
  excellent,
  average,
  bad,
}: Props) {
  const data = [
    {
      name: "Отличные (4-5)",
      value: excellent,
      color: "green",
    },
    {
      name: "Средние (3)",
      value: average,
      color: "yellow",
    },
    {
      name: "Плохие (1-2)",
      value: bad,
      color: "red",
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
        📊 Распределение оценок
      </Title>

      <PieChart
        h={320}
        data={data}
        withLabels
        withTooltip
      />
    </Card>
  );
}

export default StudentPieChart;