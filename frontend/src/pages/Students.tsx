import { Table } from "antd";
import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Student } from "../types";
import { unwrapList } from "../utils/unwrapList";

function Students() {
  const [data, setData] = useState<Student[]>([]);

  useEffect(() => {
    api.get("/api/students/").then((res) => {
      setData(unwrapList<Student>(res.data));
    });
  }, []);

  return (
    <Table<Student>
      dataSource={data}
      rowKey="id"
      columns={[
        { title: "ID", dataIndex: "id" },
        { title: "Username", dataIndex: "username" },
      ]}
    />
  );
}

export default Students;