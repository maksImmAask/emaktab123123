import {
  Card,
  Grid,
  Text,
} from "@mantine/core";

interface Props {
  students: number;
  teachers: number;
  classes: number;
  subjects: number;
}

function DirectorStats({
  students,
  teachers,
  classes,
  subjects,
}: Props) {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
        <Card withBorder shadow="sm" p="lg">
          <Text size="sm" c="dimmed">
            Учеников
          </Text>

          <Text fw={700} size="xl">
            {students}
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
        <Card withBorder shadow="sm" p="lg">
          <Text size="sm" c="dimmed">
            Учителей
          </Text>

          <Text fw={700} size="xl">
            {teachers}
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
        <Card withBorder shadow="sm" p="lg">
          <Text size="sm" c="dimmed">
            Классов
          </Text>

          <Text fw={700} size="xl">
            {classes}
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
        <Card withBorder shadow="sm" p="lg">
          <Text size="sm" c="dimmed">
            Предметов
          </Text>

          <Text fw={700} size="xl">
            {subjects}
          </Text>
        </Card>
      </Grid.Col>
    </Grid>
  );
}

export default DirectorStats;