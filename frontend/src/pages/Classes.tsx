import { Table } from "antd";
import { useEffect, useState } from "react";
import api from "../api/axios";
import type { SchoolClass } from "../types";
import { unwrapList } from "../utils/unwrapList";

function Classes() {
  const [data, setData] = useState<SchoolClass[]>([]);

  useEffect(() => {
    api.get("/api/classes/").then((res) => {
      setData(unwrapList<SchoolClass>(res.data));
    });
  }, []);

  return (
    <Table<SchoolClass>
      dataSource={data}
      rowKey="id"
      columns={[
        { title: "ID", dataIndex: "id" },
        { title: "Name", dataIndex: "name" },
      ]}
    />
  );
}

export default Classes;