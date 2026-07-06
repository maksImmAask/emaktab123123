import {
  Card,
  Group,
} from "@mantine/core";

import { Select } from "antd";

interface Option {
  label: string;
  value: number;
}

interface Props {
  classes: Option[];
  teachers: Option[];
  subjects: Option[];

  selectedClass: number | null;
  selectedTeacher: number | null;
  selectedSubject: number | null;

  onClassChange: (value: number | null) => void;
  onTeacherChange: (value: number | null) => void;
  onSubjectChange: (value: number | null) => void;
}

function DirectorFilters({
  classes,
  teachers,
  subjects,

  selectedClass,
  selectedTeacher,
  selectedSubject,

  onClassChange,
  onTeacherChange,
  onSubjectChange,
}: Props) {
  return (
    <Card withBorder shadow="sm" p="lg">
      <Group grow>
        <Select
          placeholder="Класс"
          allowClear
          value={selectedClass}
          onChange={onClassChange}
          options={classes}
        />

        <Select
          placeholder="Учитель"
          allowClear
          value={selectedTeacher}
          onChange={onTeacherChange}
          options={teachers}
        />

        <Select
          placeholder="Предмет"
          allowClear
          value={selectedSubject}
          onChange={onSubjectChange}
          options={subjects}
        />
      </Group>
    </Card>
  );
}

export default DirectorFilters;