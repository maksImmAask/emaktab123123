import { Table } from "antd";
import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Schedule } from "../types";
import { unwrapList } from "../utils/unwrapList";

function SchedulePage() {
  const [data, setData] = useState<Schedule[]>([]);

  useEffect(() => {
    api.get("/api/schedules/").then((res) => {
      setData(unwrapList<Schedule>(res.data));
    });
  }, []);

  return (
    <Table<Schedule>
      dataSource={data}
      rowKey="id"
      columns={[
        { title: "Class", render: (_, r) => r.school_class.name },
        { title: "Subject", render: (_, r) => r.subject.name },
        { title: "Teacher", render: (_, r) => r.teacher.username },
        { title: "Weekday", dataIndex: "weekday" },
        { title: "Lesson", dataIndex: "lesson_number" },
      ]}
    />
  );
}

export default SchedulePage;