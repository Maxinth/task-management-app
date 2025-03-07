import { FilterStatus, Task } from "../App";
import { MdOutlineAutoDelete } from "react-icons/md";
import { trimToLength } from "../../utils";

interface TaskListProp {
  filteredTasks: Task[];
  deleteTask: (id: number) => void;
  filter: FilterStatus;
  toggleComplete: (id: number) => void;
}

const TasksList = ({
  filteredTasks,
  deleteTask,
  filter,
  toggleComplete,
}: TaskListProp) => {
  return (
    <ul>
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 min-h-[200px] text-2xl shadow-lg bg-gray-100 flex items-center justify-center">
          {filter === "all" ? "No tasks!" : "No matching tasks"}
        </p>
      ) : (
        filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-2 rounded duration-300 ease-in-out mb-2 ${
              task.completed
                ? "bg-green-100 hover:bg-green-200"
                : "bg-gray-100 hover:bg-gray-200 "
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="h-5 w-5 cursor-pointer"
              />

              <span
                title={task.text}
                className={`max-w-[200px] lg:min-w-[300px] ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {trimToLength(task.text, 39)}
              </span>
            </div>

            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                task.completed
                  ? "bg-green-500 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {task.completed ? "Completed" : "Active"}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
              title="Delete Task"
              className="text-red-500 hover:text-red-700 cursor-pointer "
            >
              <MdOutlineAutoDelete color="red" size={20} />
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default TasksList;
