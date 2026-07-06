import { Card, Title } from "@mantine/core";
import { Table } from "antd";

interface Teacher {
  id: number;
  username: string;
}

interface Props {
  teachers: Teacher[];
}

function DirectorTeachers({
  teachers,
}: Props) {
  return (
    <Card
      withBorder
      shadow="sm"
      p="lg"
    >
      <Title order={4} mb="md">
        👨‍🏫 Учителя
      </Title>

      <Table
        rowKey="id"
        pagination={{
          pageSize: 8,
        }}
        dataSource={teachers}
        columns={[
          {
            title: "Username",
            dataIndex: "username",
          },
        ]}
      />
    </Card>
  );
}

export default DirectorTeachers;