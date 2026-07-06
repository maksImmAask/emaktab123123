import { Card, Grid, Title } from "@mantine/core";
import { Select } from "antd";

interface Option {
  label: string;
  value: number;
}

interface Props {
  classes: Option[];
  subjects: Option[];

  selectedClass: number | null;
  selectedSubject: number | null;

  onClassChange: (value: number) => void;
  onSubjectChange: (value: number) => void;
}

function TeacherClassSelector({
  classes,
  subjects,
  selectedClass,
  selectedSubject,
  onClassChange,
  onSubjectChange,
}: Props) {
  return (
    <Card
      shadow="sm"
      withBorder
      radius="md"
      p="lg"
    >
      <Title order={4} mb="lg">
        📖 Выберите класс
      </Title>

      <Grid>
        <Grid.Col span={6}>
          <Select
            style={{ width: "100%" }}
            placeholder="Класс"
            value={selectedClass ?? undefined}
            options={classes}
            onChange={onClassChange}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            style={{ width: "100%" }}
            placeholder="Предмет"
            value={selectedSubject ?? undefined}
            options={subjects}
            onChange={onSubjectChange}
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
}

export default TeacherClassSelector;