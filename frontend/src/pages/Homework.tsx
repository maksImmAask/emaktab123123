import { Table } from "antd";
import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Homework } from "../types";
import { unwrapList } from "../utils/unwrapList";

function HomeworkPage() {
  const [data, setData] = useState<Homework[]>([]);

  useEffect(() => {
    api.get("/api/homework/").then((res) => {
      setData(unwrapList<Homework>(res.data));
    });
  }, []);

  return (
    <Table<Homework>
      dataSource={data}
      rowKey="id"
      columns={[
        {
          title: "Class",
          render: (_, r) => r.schedule.school_class.name,
        },
        {
          title: "Subject",
          render: (_, r) => r.schedule.subject.name,
        },
        {
          title: "Teacher",
          render: (_, r) => r.schedule.teacher.username,
        },
        {
          title: "Description",
          dataIndex: "description",
        },
        {
          title: "Created",
          dataIndex: "created_at",
        },
      ]}
    />
  );
}

export default HomeworkPage;