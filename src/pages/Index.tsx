import { useState } from "react";
import { Task } from "@/types/task";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const completeTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const updateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!editingTask) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id
          ? { ...task, ...taskData }
          : task
      )
    );
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your tasks and stay organized.
          </p>
        </div>
        
        <TaskForm
          onSubmit={editingTask ? updateTask : addTask}
          editingTask={editingTask || undefined}
          onCancel={() => setEditingTask(null)}
        />

        <TaskList
          tasks={tasks}
          onComplete={completeTask}
          onDelete={deleteTask}
          onEdit={startEditing}
        />
      </div>
    </div>
  );
};

export default Index;