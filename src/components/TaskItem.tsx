import { useState } from "react";
import { Task } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem = ({ task, onComplete, onDelete, onEdit }: TaskItemProps) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      onComplete(task.id);
    }, 300);
  };

  const priorityColors = {
    low: "bg-priority-low/10 text-priority-low border-priority-low/20",
    medium: "bg-priority-medium/10 text-priority-medium border-priority-medium/20",
    high: "bg-priority-high/10 text-priority-high border-priority-high/20",
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-3 p-4 rounded-lg border bg-card transition-all",
        isCompleting && "animate-task-complete",
        !isCompleting && "hover:shadow-md"
      )}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleComplete}
        className="h-5 w-5"
      />
      <span
        className={cn(
          "flex-1 text-sm font-medium transition-all",
          task.completed && "line-through text-muted-foreground"
        )}
      >
        {task.title}
      </span>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-xs px-2 py-1 rounded-full border",
            priorityColors[task.priority]
          )}
        >
          {task.priority}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(task)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;