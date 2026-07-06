import { Button, Card, Group } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";

interface Props {
  loading: boolean;
  onSave: () => void;
}

function TeacherSaveButton({
  loading,
  onSave,
}: Props) {
  return (
    <Card
      shadow="sm"
      withBorder
      radius="md"
      p="lg"
    >
      <Group justify="flex-end">
        <Button
          leftSection={<IconDeviceFloppy size={18} />}
          loading={loading}
          onClick={onSave}
        >
          Сохранить журнал
        </Button>
      </Group>
    </Card>
  );
}

export default TeacherSaveButton;