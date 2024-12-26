import { useState } from "react";
import { Priority, Task } from "@/types/task";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void;
  editingTask?: Task;
  onCancel?: () => void;
}

const TaskForm = ({ onSubmit, editingTask, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(editingTask?.title || "");
  const [priority, setPriority] = useState<Priority>(editingTask?.priority || "medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      priority,
      completed: false,
    });

    if (!editingTask) {
      setTitle("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
      />
      <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">{editingTask ? "Update" : "Add"}</Button>
      {editingTask && (
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </form>
  );
};

export default TaskForm;