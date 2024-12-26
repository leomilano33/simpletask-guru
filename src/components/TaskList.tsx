import { Task } from "@/types/task";
import TaskItem from "./TaskItem";
import { useToast } from "@/components/ui/use-toast";

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskList = ({ tasks, onComplete, onDelete, onEdit }: TaskListProps) => {
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    onDelete(id);
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully.",
    });
  };

  const handleComplete = (id: string) => {
    onComplete(id);
    toast({
      title: "Task completed",
      description: "Great job! Keep up the good work!",
      duration: 3000,
    });
  };

  return (
    <div 
      className="space-y-3"
      role="list"
      aria-label="Task list"
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={handleComplete}
          onDelete={handleDelete}
          onEdit={onEdit}
        />
      ))}
      {tasks.length === 0 && (
        <div 
          className="text-center py-8 text-muted-foreground"
          role="status"
          aria-label="No tasks available"
        >
          No tasks yet. Add your first task above!
        </div>
      )}
    </div>
  );
};

export default TaskList;