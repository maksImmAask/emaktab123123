import {
  Card,
  Grid,
  Group,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import {
  IconBook,
  IconChartBar,
  IconSchool,
  IconUser,
} from "@tabler/icons-react";

interface Props {
  average: number;
  grades: number;
  attendance: number;
  homework: number;
}

function StudentStats({
  average,
  grades,
  attendance,
  homework,
}: Props) {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Card shadow="sm" withBorder radius="md" p="lg">
          <Group justify="space-between">
            <div>
              <Text c="dimmed" size="sm">
                Средний балл
              </Text>

              <Title order={2}>{average}</Title>
            </div>

            <ThemeIcon
              size={56}
              radius="xl"
              color="blue"
              variant="light"
            >
              <IconChartBar size={30} />
            </ThemeIcon>
          </Group>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 3 }}>
        <Card shadow="sm" withBorder radius="md" p="lg">
          <Group justify="space-between">
            <div>
              <Text c="dimmed" size="sm">
                Оценок
              </Text>

              <Title order={2}>{grades}</Title>
            </div>

            <ThemeIcon
              size={56}
              radius="xl"
              color="green"
              variant="light"
            >
              <IconBook size={30} />
            </ThemeIcon>
          </Group>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 3 }}>
        <Card shadow="sm" withBorder radius="md" p="lg">
          <Group justify="space-between">
            <div>
              <Text c="dimmed" size="sm">
                Посещений
              </Text>

              <Title order={2}>{attendance}</Title>
            </div>

            <ThemeIcon
              size={56}
              radius="xl"
              color="yellow"
              variant="light"
            >
              <IconUser size={30} />
            </ThemeIcon>
          </Group>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 3 }}>
        <Card shadow="sm" withBorder radius="md" p="lg">
          <Group justify="space-between">
            <div>
              <Text c="dimmed" size="sm">
                Домашних
              </Text>

              <Title order={2}>{homework}</Title>
            </div>

            <ThemeIcon
              size={56}
              radius="xl"
              color="red"
              variant="light"
            >
              <IconSchool size={30} />
            </ThemeIcon>
          </Group>
        </Card>
      </Grid.Col>
    </Grid>
  );
}

export default StudentStats;