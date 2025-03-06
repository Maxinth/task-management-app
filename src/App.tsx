import { useState } from "react";
import TaskInputBox from "./components/TaskInputBox";
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [taskText, setTaskText] = useState<string>("");

  //* Add task if user presses enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTask();
  };

  const addTask = (): void => {
    if (!taskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
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

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 mb-4">
        {(["all", "active", "completed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded ${
              filter === status ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 min-h-[200px] text-2xl shadow-lg bg-gray-100 flex items-center justify-center">
            {filter === "all" ? "No tasks!" : "No matching tasks"}
          </p>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-2 rounded mb-2 ${
                task.completed ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="h-5 w-5 cursor-pointer"
                />

                {/* Task Text */}
                <span
                  className={`cursor-pointer ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>

              {/* Task Status */}
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  task.completed
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                {task.completed ? "Completed" : "Active"}
              </span>

              {/* Delete Button */}
              <button
                onClick={() => deleteTask(task.id)}
                title="Delete Task"
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                ✖
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
