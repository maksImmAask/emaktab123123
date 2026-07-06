import { useEffect, useState } from "react";

import {
  Grid,
  Loader,
  Stack,
  Text,
  Title,
  Group,
} from "@mantine/core";

import api from "../api/axios";

import DirectorStats from "../components/director/DirectorStats";
import DirectorFilters from "../components/director/DirectorFilters";
import DirectorStudents from "../components/director/DirectorStudents";
import DirectorTeachers from "../components/director/DirectorTeachers";
import DirectorSchedule from "../components/director/DirectorSchedule";
import DirectorHomework from "../components/director/DirectorHomework";
import DirectorGrades from "../components/director/DirectorGrades";
import DirectorAttendance from "../components/director/DirectorAttendance";

import type {
  Attendance,
  Grade,
  Homework,
  Schedule,
  Student,
  Teacher,
} from "../types";

interface DirectorDashboardResponse {
  stats: {
    students: number;
    teachers: number;
    classes: number;
    subjects: number;
  };

  students: Student[];
  teachers: Teacher[];
  grades: Grade[];
  attendance: Attendance[];
  schedule: Schedule[];
  homework: Homework[];

  classes: {
    id: number;
    name: string;
  }[];

  subjects: {
    id: number;
    name: string;
  }[];
}

function DirectorDashboard() {
  const [loading, setLoading] =
    useState(true);

  const [dashboard, setDashboard] =
    useState<DirectorDashboardResponse | null>(
      null
    );

  const [selectedClass, setSelectedClass] =
    useState<number | null>(null);

  const [selectedTeacher, setSelectedTeacher] =
    useState<number | null>(null);

  const [selectedSubject, setSelectedSubject] =
    useState<number | null>(null);

  useEffect(() => {
    api
      .get("/api/director/dashboard/")
      .then((res) => {
        setDashboard(res.data);
      })
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

  return (
    <Stack p="lg">

      <Title order={2}>
        🏫 Кабинет директора
      </Title>

      <DirectorStats
        students={dashboard.stats.students}
        teachers={dashboard.stats.teachers}
        classes={dashboard.stats.classes}
        subjects={dashboard.stats.subjects}
      />

      <DirectorFilters
        classes={dashboard.classes.map((c) => ({
          label: c.name,
          value: c.id,
        }))}
        teachers={dashboard.teachers.map((t) => ({
          label: t.username,
          value: t.id,
        }))}
        subjects={dashboard.subjects.map((s) => ({
          label: s.name,
          value: s.id,
        }))}
        selectedClass={selectedClass}
        selectedTeacher={selectedTeacher}
        selectedSubject={selectedSubject}
        onClassChange={setSelectedClass}
        onTeacherChange={setSelectedTeacher}
        onSubjectChange={setSelectedSubject}
      />

      <Grid>

        <Grid.Col span={6}>
          <DirectorStudents
            students={dashboard.students}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <DirectorTeachers
            teachers={dashboard.teachers}
          />
        </Grid.Col>

      </Grid>

      <DirectorSchedule
        schedule={dashboard.schedule}
      />

      <DirectorHomework
        homework={dashboard.homework}
      />

      <DirectorGrades
        grades={dashboard.grades}
      />

      <DirectorAttendance
        attendance={dashboard.attendance}
      />

    </Stack>
  );
}

export default DirectorDashboard;