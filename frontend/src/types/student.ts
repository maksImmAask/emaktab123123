export interface Student {
  id: number;
  username: string;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Teacher {
  id: number;
  username: string;
}

export interface Grade {
  id: number;
  value: number;
  date: string;
  student: Student;
  subject: Subject;
  teacher: Teacher;
}

export interface Schedule {
  id: number;
  weekday: number;
  lesson_number: number;
  subject: Subject;
  teacher: Teacher;
}

export interface Homework {
  id: number;
  description: string;
  file: string | null;
  created_at: string;
  schedule: Schedule;
}

export interface Attendance {
  id: number;
  date: string;
  status: "present" | "late" | "absent";
  schedule: Schedule;
}

export interface DashboardResponse {
  student: Student;
  average_grade: number;
  grades: Grade[];
  attendance: Attendance[];
  schedule: Schedule[];
  homework: Homework[];
}