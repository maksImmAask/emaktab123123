import { Table } from "antd";
import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Attendance } from "../types";
import { unwrapList } from "../utils/unwrapList";

function AttendancePage() {
  const [data, setData] = useState<Attendance[]>([]);

  useEffect(() => {
    api.get("/api/attendance/").then((res) => {
      setData(unwrapList<Attendance>(res.data));
    });
  }, []);

  return (
    <Table<Attendance>
      dataSource={data}
      rowKey="id"
      columns={[
        {
          title: "Student",
          render: (_, r) => r.student.username,
        },
        {
          title: "Class",
          render: (_, r) => r.student.school_class.name,
        },
        {
          title: "Date",
          dataIndex: "date",
        },
        {
          title: "Status",
          dataIndex: "status",
        },
      ]}
    />
  );
}

export default AttendancePage;