import { useState } from "react";
import { Task } from "@/types/task";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { List, User, Briefcase, Plus, Search } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setShowForm(false);
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

  const editTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card p-4 space-y-6 animate-slide-in-right">
        <h1 className="text-2xl font-bold animate-fade-in">Tasks</h1>
        
        <nav className="space-y-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              selectedCategory === "all" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            }`}
          >
            <List className="h-5 w-5" />
            All Tasks
          </button>
          
          <button
            onClick={() => setSelectedCategory("personal")}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              selectedCategory === "personal" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            }`}
          >
            <User className="h-5 w-5" />
            Personal
          </button>
          
          <button
            onClick={() => setSelectedCategory("work")}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              selectedCategory === "work" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            }`}
          >
            <Briefcase className="h-5 w-5" />
            Work
          </button>
        </nav>

        <div className="space-y-2 animate-fade-in">
          <h2 className="font-medium px-4">Progress</h2>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground px-4">
            {completedTasks} of {tasks.length} tasks completed
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 animate-fade-in">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              <Input
                placeholder="Search tasks..."
                className="pl-9 transition-all duration-200 hover:shadow-md focus:shadow-md"
              />
            </div>
            <Button 
              onClick={() => setShowForm(true)} 
              className="gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>

          {showForm && (
            <div className="animate-scale-in">
              <TaskForm
                onSubmit={addTask}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

          <TaskList
            tasks={tasks}
            onComplete={completeTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />

          {!showForm && tasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground animate-fade-in">
              No tasks found. Create a new task to get started!
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;