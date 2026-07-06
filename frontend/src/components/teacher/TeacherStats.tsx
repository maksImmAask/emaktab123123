import { Card, Grid, Group, Text, ThemeIcon } from "@mantine/core";
import {
  IconSchool,
  IconBook,
  IconUsers,
  IconNotebook,
} from "@tabler/icons-react";

interface Props {
  classes: number;
  lessons: number;
  students: number;
  homework: number;
}

function TeacherStats({
  classes,
  lessons,
  students,
  homework,
}: Props) {
  const cards = [
    {
      title: "Мои классы",
      value: classes,
      icon: <IconSchool size={22} />,
    },
    {
      title: "Сегодня уроков",
      value: lessons,
      icon: <IconBook size={22} />,
    },
    {
      title: "Учеников",
      value: students,
      icon: <IconUsers size={22} />,
    },
    {
      title: "Домашних заданий",
      value: homework,
      icon: <IconNotebook size={22} />,
    },
  ];

  return (
    <Grid>
      {cards.map((card) => (
        <Grid.Col
          key={card.title}
          span={{ base: 12, sm: 6, lg: 3 }}
        >
          <Card
            shadow="sm"
            withBorder
            radius="md"
            p="lg"
          >
            <Group justify="space-between">
              <div>
                <Text c="dimmed" size="sm">
                  {card.title}
                </Text>

                <Text
                  fw={700}
                  fz={28}
                >
                  {card.value}
                </Text>
              </div>

              <ThemeIcon
                size={48}
                radius="xl"
                color="blue"
                variant="light"
              >
                {card.icon}
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default TeacherStats;