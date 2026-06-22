import { Table } from "antd";
import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Grade } from "../types";
import { unwrapList } from "../utils/unwrapList";

function Grades() {
  const [data, setData] = useState<Grade[]>([]);

  useEffect(() => {
    api.get("/api/grades/").then((res) => {
      setData(unwrapList<Grade>(res.data));
    });
  }, []);

  return (
    <Table<Grade>
      dataSource={data}
      rowKey="id"
      columns={[
        {
          title: "Student",
          render: (_, r) => r.student.username,
        },
        {
          title: "Subject",
          render: (_, r) => r.subject.name,
        },
        {
          title: "Teacher",
          render: (_, r) => r.teacher.username,
        },
        {
          title: "Value",
          dataIndex: "value",
        },
        {
          title: "Date",
          dataIndex: "date",
        },
      ]}
    />
  );
}

export default Grades;