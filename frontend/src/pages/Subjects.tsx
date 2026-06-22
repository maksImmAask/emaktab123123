import { Table } from "antd";
import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Subject } from "../types";
import { unwrapList } from "../utils/unwrapList";

function Subjects() {
  const [data, setData] = useState<Subject[]>([]);

  useEffect(() => {
    api.get("/api/subjects/").then((res) => {
      setData(unwrapList<Subject>(res.data));
    });
  }, []);

  return (
    <Table<Subject>
      dataSource={data}
      rowKey="id"
      columns={[
        { title: "ID", dataIndex: "id" },
        { title: "Name", dataIndex: "name" },
      ]}
    />
  );
}

export default Subjects;