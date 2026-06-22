export interface SchoolClass {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  username: string;
  school_class: SchoolClass;
}

export interface Teacher {
  id: number;
  username: string;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Schedule {
  id: number;
  school_class: SchoolClass;
  subject: Subject;
  teacher: Teacher;
  weekday: number;
  lesson_number: number;
}

export interface Homework {
  id: number;
  schedule: Schedule;
  description: string;
  file?: string;
  created_at: string;
}

export interface Grade {
  id: number;
  student: Student;
  subject: Subject;
  teacher: Teacher;
  value: number;
  date: string;
}

export interface Attendance {
  id: number;
  student: Student;
  schedule: Schedule;
  date: string;
  status: "present" | "absent" | "late";
}