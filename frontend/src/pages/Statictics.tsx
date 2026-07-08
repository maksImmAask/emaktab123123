import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { unwrapList } from "../utils/unwrapList";import {
  PieChart,
  BarChart,
  LineChart,
} from "@mantine/charts";
import type {
  Attendance,
  Grade,
  Homework,
  SchoolClass,
  Student,
  Subject,
  Teacher,
} from "../types";
import { Table } from "antd";
import {
  Card,
  Col,
  Row,
  Spin,
  Statistic,
  Typography,
} from "antd";
import {
  Space,
} from "antd";
import {
  BookOutlined,
  HomeOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

function DashboardStats() {
  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [homework, setHomework] = useState<Homework[]>([]);

  async function loadDashboard() {
    try {
      const [
        studentsRes,
        teachersRes,
        subjectsRes,
        classesRes,
        gradesRes,
        attendanceRes,
        homeworkRes,
      ] = await Promise.all([
        api.get("/api/students/"),
        api.get("/api/teachers/"),
        api.get("/api/subjects/"),
        api.get("/api/classes/"),
        api.get("/api/grades/"),
        api.get("/api/attendance/"),
        api.get("/api/homework/"),
      ]);

      setStudents(unwrapList<Student>(studentsRes.data));
      setTeachers(unwrapList<Teacher>(teachersRes.data));
      setSubjects(unwrapList<Subject>(subjectsRes.data));
      setClasses(unwrapList<SchoolClass>(classesRes.data));
      setGrades(unwrapList<Grade>(gradesRes.data));
      setAttendance(unwrapList<Attendance>(attendanceRes.data));
      setHomework(unwrapList<Homework>(homeworkRes.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();
  }, []);

  const studentsCount = students.length;
  const teachersCount = teachers.length;
  const subjectsCount = subjects.length;
  const classesCount = classes.length;

  const goodGrades = grades.filter(
    (g) => g.value >= 4
  ).length;

  const averageGrades = grades.filter(
    (g) => g.value === 3
  ).length;

  const badGrades = grades.filter(
    (g) => g.value <= 2
  ).length;

  const averageGrade = useMemo(() => {
    if (!grades.length) return 0;

    const sum = grades.reduce(
      (acc, g) => acc + g.value,
      0
    );

    return Number((sum / grades.length).toFixed(2));
  }, [grades]);

  const presentCount = attendance.filter(
    (a) => a.status === "present"
  ).length;

  const lateCount = attendance.filter(
    (a) => a.status === "late"
  ).length;

  const absentCount = attendance.filter(
    (a) => a.status === "absent"
  ).length;

  const latestGrades = [...grades]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 10);

  const latestHomework = [...homework]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 10);

  const homeworkToday = homework.filter((item) => {
    const created = new Date(item.created_at);

    const today = new Date();

    return (
      created.getFullYear() === today.getFullYear() &&
      created.getMonth() === today.getMonth() &&
      created.getDate() === today.getDate()
    );
  }).length;
  const pieData = [
    {
        name: "Excellent",
        value: goodGrades,
        color: "green",
    },
    {
        name: "Average",
        value: averageGrades,
        color: "yellow",
    },
    {
        name: "Bad",
        value: badGrades,
        color: "red",
    },
    ];
    const attendanceData = [
    {
        status: "Attendance",
        Present: presentCount,
        Late: lateCount,
        Absent: absentCount,
    },
    ];
    const lineData = [...latestGrades]
    .reverse()
    .map((grade) => ({
        date: new Date(grade.date).toLocaleDateString(),
        Grade: grade.value,
    }));
    if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Space
        style={{
            width: "100%",
            marginBottom: 20,
        }}
        >
        <Typography.Title
            level={2}
            style={{ margin: 0 }}
        >
            📊 School Dashboard
        </Typography.Title>

        <Typography.Text type="secondary">
            Overview of school statistics
        </Typography.Text>
        </Space>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Students"
              value={studentsCount}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Teachers"
              value={teachersCount}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Subjects"
              value={subjectsCount}
              prefix={<ReadOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Classes"
              value={classesCount}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Average Grade"
              value={averageGrade}
              precision={2}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Homework Today"
              value={homeworkToday}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title="Total Grades"
              value={grades.length}
            />
          </Card>
        </Col>
      </Row>

      <Row
        gutter={[16, 16]}
        style={{ marginTop: 24 }}
        >
        <Col xs={24} lg={12}>
            <Card title="Grades Distribution">
            <PieChart
                h={350}
                data={pieData}
                withLabels
                withTooltip
            />
            </Card>
        </Col>

        <Col xs={24} lg={12}>
            <Card title="Attendance Statistics">
            <BarChart
                h={350}
                data={attendanceData}
                dataKey="status"
                withLegend
                series={[
                {
                    name: "Present",
                    color: "green",
                },
                {
                    name: "Late",
                    color: "yellow",
                },
                {
                    name: "Absent",
                    color: "red",
                },
                ]}
            />
            </Card>
        </Col>
        </Row>
        <Row
        gutter={[16, 16]}
        style={{ marginTop: 24 }}
        >
        <Col xs={24} lg={14}>
            <Card title="Last 10 Grades">
            <Table
                rowKey="id"
                pagination={false}
                dataSource={latestGrades}
                columns={[
                {
                    title: "Student",
                    render: (_: unknown, row: Grade) =>
                    row.student.username,
                },
                {
                    title: "Subject",
                    render: (_: unknown, row: Grade) =>
                    row.schedule.subject.name,
                },
                {
                    title: "Class",
                    render: (_: unknown, row: Grade) =>
                    row.schedule.school_class.name,
                },
                {
                    title: "Grade",
                    dataIndex: "value",
                },
                {
                    title: "Date",
                    dataIndex: "date",
                },
                ]}
            />
            </Card>
        </Col>

        <Col xs={24} lg={10}>
            <Card title="Latest Homework">
            <Table
                rowKey="id"
                pagination={false}
                dataSource={latestHomework}
                columns={[
                {
                    title: "Subject",
                    render: (_, row) => row.schedule.subject.name,
                },
                {
                    title: "Class",
                    render: (_, row) => row.schedule.school_class.name,
                },
                {
                    title: "Created",
                    render: (_, row) =>
                    new Date(row.created_at).toLocaleDateString(),
                },
                ]}
            />
            </Card>
        </Col>
        </Row>
        <Row
        gutter={[16, 16]}
        style={{ marginTop: 24 }}
        >
        <Col span={24}>
            <Card title="Grade Trend">
            <LineChart
                h={350}
                data={lineData}
                dataKey="date"
                curveType="linear"
                withLegend
                withDots
                series={[
                {
                    name: "Grade",
                    color: "blue",
                },
                ]}
            />
            </Card>
        </Col>
        </Row>
    </div>
  );
}
export default DashboardStats;