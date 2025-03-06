import { useState, useEffect } from "react";
import TaskInputBox from "./components/TaskInputBox";
import TasksFilters from "./components/TasksFilters";
import TasksList from "./components/TasksList";
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export type FilterStatus = "all" | "active" | "completed";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState<FilterStatus>("all");
  const [taskText, setTaskText] = useState<string>("");

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (): void => {
    if (!taskText.trim()) return;
    const newTasks = [
      ...tasks,
      { id: Date.now(), text: taskText, completed: false },
    ];
    setTasks(newTasks);
    setFilter("all");
    setTaskText("");
  };

  const toggleComplete = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTask();
  };

  const filteredTasks: Task[] = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg min-h-[400px]">
      <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
      <TaskInputBox {...{ taskText, setTaskText, addTask, handleKeyDown }} />
      <TasksFilters {...{ filter, setFilter }} />
      <TasksList {...{ filteredTasks, deleteTask, filter, toggleComplete }} />
    </div>
  );
}
