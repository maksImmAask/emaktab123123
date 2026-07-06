import {
  Grid,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { useEffect, useState } from "react";

import api from "../api/axios";

import StudentStats from "../components/student/StudentStats";
import StudentPieChart from "../components/student/StudentPieChart";
import StudentAttendanceChart from "../components/student/StudentAttendanceChart";
import StudentSchedule from "../components/student/StudentSchedule";
import StudentHomework from "../components/student/StudentHomework";
import StudentGrades from "../components/student/StudentGrades";
import type { Grade, Attendance, Homework, Schedule, Student } from "../types";

interface DashboardResponse {
  student: Student;
  average_grade: number;
  grades: Grade[];
  attendance: Attendance[];
  schedule: Schedule[];
  homework: Homework[];
}

function StudentDashboard() {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    api
      .get("/api/student/dashboard/")
      .then((res) => setDashboard(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Group justify="center" mt={100}>
        <Loader size="xl" />
      </Group>
    );
  }

  if (!dashboard) {
    return (
      <Text ta="center">
        Не удалось загрузить данные
      </Text>
    );
  }

  const excellent =
    dashboard.grades.filter(
      (g) => g.value >= 4
    ).length;

  const average =
    dashboard.grades.filter(
      (g) => g.value === 3
    ).length;

  const bad =
    dashboard.grades.filter(
      (g) => g.value <= 2
    ).length;

  const present =
    dashboard.attendance.filter(
      (a) => a.status === "present"
    ).length;

  const late =
    dashboard.attendance.filter(
      (a) => a.status === "late"
    ).length;

  const absent =
    dashboard.attendance.filter(
      (a) => a.status === "absent"
    ).length;

  return (
    <Stack p="lg">

      <Title order={2}>
        Добро пожаловать,
        {" "}
        {dashboard.student.username}
        👋
      </Title>

      <StudentStats
        average={dashboard.average_grade}
        grades={dashboard.grades.length}
        attendance={present}
        homework={dashboard.homework.length}
      />

      <Grid>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <StudentPieChart
            excellent={excellent}
            average={average}
            bad={bad}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <StudentAttendanceChart
            present={present}
            late={late}
            absent={absent}
          />
        </Grid.Col>

      </Grid>

      <Grid>

        <Grid.Col span={12}>
          <StudentSchedule
            schedule={dashboard.schedule}
          />
        </Grid.Col>

      </Grid>

      <Grid>

        <Grid.Col span={{ base: 12, lg: 7 }}>
          <StudentGrades
            grades={dashboard.grades}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 5 }}>
          <StudentHomework
            homework={dashboard.homework}
          />
        </Grid.Col>

      </Grid>

    </Stack>
  );
}

export default StudentDashboard;