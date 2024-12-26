import { useState } from "react";
import { Task } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
    // Provide haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    setTimeout(() => {
      onComplete(task.id);
    }, 300);
  };

  const handleDelete = () => {
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    onDelete(task.id);
  };

  const priorityColors = {
    low: "bg-priority-low/10 text-priority-low border-priority-low/20",
    medium: "bg-priority-medium/10 text-priority-medium border-priority-medium/20",
    high: "bg-priority-high/10 text-priority-high border-priority-high/20",
  };

  return (
    <div
      className={cn(
        "group flex flex-col gap-2 p-4 rounded-lg border bg-card transition-all",
        "hover:shadow-md focus-within:shadow-md",
        "sm:flex-row sm:items-center",
        isCompleting && "animate-task-complete",
        !isCompleting && "hover:shadow-md"
      )}
      role="listitem"
      aria-label={`Task: ${task.title}, Priority: ${task.priority}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleComplete}
          className="h-5 w-5"
          aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="flex-1">
          <span
            className={cn(
              "text-sm font-medium transition-all",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </span>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {task.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 ml-8 sm:ml-0">
        <span
          className={cn(
            "text-xs px-2 py-1 rounded-full border",
            priorityColors[task.priority]
          )}
        >
          {task.priority}
        </span>
        {task.dueDate && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {format(task.dueDate, "PP")}
          </span>
        )}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={handleDelete}
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;