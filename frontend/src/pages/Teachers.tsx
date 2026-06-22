import { Table } from "antd";
import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Teacher } from "../types";
import { unwrapList } from "../utils/unwrapList";

function Teachers() {
  const [data, setData] = useState<Teacher[]>([]);

  useEffect(() => {
    api.get("/api/teachers/").then((res) => {
      setData(unwrapList<Teacher>(res.data));
    });
  }, []);

  return (
    <Table<Teacher>
      dataSource={data}
      rowKey="id"
      columns={[
        { title: "ID", dataIndex: "id" },
        { title: "Username", dataIndex: "username" },
      ]}
    />
  );
}

export default Teachers;