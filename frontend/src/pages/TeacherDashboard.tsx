import { useEffect, useState, useCallback } from "react";
import {
  Grid,
  Stack,
  Title,
} from "@mantine/core";

import api from "../api/axios";

import TeacherStats from "../components/teacher/TeacherStats";
import TeacherSchedule from "../components/teacher/TeacherSchedule";
import TeacherHomework from "../components/teacher/TeacherHomework";
import TeacherClassSelector from "../components/teacher/TeacherClassSelector";
import TeacherStudentTable from "../components/teacher/TeacherStudentTable";
import TeacherSaveButton from "../components/teacher/TeacherSaveButton";

import type {
  Schedule,
  Homework,
  TeacherStudent,
} from "../types";

interface TeacherDashboardResponse {
  stats: {
    classes: number;
    students: number;
    lessons: number;
    homework: number;
  };

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

function TeacherDashboard() {
  const [loading, setLoading] =
    useState(false);

  const [selectedClass, setSelectedClass] =
    useState<number | null>(null);

  const [selectedSubject, setSelectedSubject] =
    useState<number | null>(null);

  const [stats, setStats] =
    useState({
      classes: 0,
      students: 0,
      lessons: 0,
      homework: 0,
    });

  const [schedule, setSchedule] =
    useState<Schedule[]>([]);

  const [homework, setHomework] =
    useState<Homework[]>([]);

  const [students, setStudents] =
    useState<TeacherStudent[]>([]);

  const [classes, setClasses] =
    useState<
      {
        label: string;
        value: number;
      }[]
    >([]);

  const [subjects, setSubjects] =
    useState<
      {
        label: string;
        value: number;
      }[]
    >([]);
    const loadStudents = useCallback(async () => {
    if (!selectedClass || !selectedSubject) return;

    try {
        const res = await api.get<TeacherStudent[]>(
        `/api/teacher/students/?class=${selectedClass}&subject=${selectedSubject}`
        );

        setStudents(res.data);
    } catch (e) {
        console.error(e);
    }
    }, [selectedClass, selectedSubject]);

  useEffect(() => {
    api
      .get<TeacherDashboardResponse>(
        "/api/teacher/dashboard/"
      )
      .then((res) => {
        const data = res.data;

        setStats(data.stats);

        setSchedule(data.schedule);

        setHomework(data.homework);

        setClasses(
          data.classes.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );

        setSubjects(
          data.subjects.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      });
  }, []);

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedClass, selectedSubject]);

  const handleGradeChange = (
    id: number,
    grade: number
  ) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              grade,
            }
          : student
      )
    );
  };

    const handleAttendanceChange = (
    id: number,
    attendance: TeacherStudent["attendance"]
    ) => {
    setStudents((prev) =>
        prev.map((student) =>
        student.id === id
            ? {
                ...student,
                attendance,
            }
            : student
        )
    );
    };

    const handleSave = async () => {
    if (!selectedClass || !selectedSubject)
        return;

    setLoading(true);

    try {
        await api.post(
        "/api/teacher/save-journal/",
        {
            class_id: selectedClass,
            subject_id: selectedSubject,

            students: students.map((student) => ({
            student: student.id,
            grade: student.grade ?? 5,
            attendance:
                student.attendance ?? "present",
            })),
        }
        );

        await loadStudents();

    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
    };
  return (
    <Stack p="lg">
      <Title order={2}>
        👨‍🏫 Кабинет учителя
      </Title>

      <TeacherStats
        classes={stats.classes}
        lessons={stats.lessons}
        students={stats.students}
        homework={stats.homework}
      />

      <Grid>
        <Grid.Col
          span={{
            base: 12,
            lg: 6,
          }}
        >
          <TeacherSchedule
            schedule={schedule}
          />
        </Grid.Col>

        <Grid.Col
          span={{
            base: 12,
            lg: 6,
          }}
        >
            <TeacherHomework
            homework={homework}
            schedule={schedule}
            onReload={() => {
                api
                .get<TeacherDashboardResponse>(
                    "/api/teacher/dashboard/"
                )
                .then((res) => {
                    setHomework(res.data.homework);
                });
            }}
            />
        </Grid.Col>
      </Grid>

      <TeacherClassSelector
        classes={classes}
        subjects={subjects}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        onClassChange={
          setSelectedClass
        }
        onSubjectChange={
          setSelectedSubject
        }
      />

      <TeacherStudentTable
        students={students}
        onGradeChange={
          handleGradeChange
        }
        onAttendanceChange={
          handleAttendanceChange
        }
      />

      <TeacherSaveButton
        loading={loading}
        onSave={handleSave}
      />
    </Stack>
  );
}

export default TeacherDashboard;