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
            className={`flex justify-between items-center flex-wrap p-2 rounded duration-300 ease-in-out mb-2 ${
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
                className={`hidden md:block max-w-[200px] min-w-[100px] md:min-w-[300px] ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {trimToLength(task.text, 39)}
              </span>
              <span
                title={task.text}
                className={`md:hidden max-w-[200px] min-w-[200px] md:min-w-[300px] ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {trimToLength(task.text, 18)}
              </span>
            </div>

            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                task.completed
                  ? "bg-green-500 text-white"
                  : "bg-black text-yellow-500"
              }`}
            >
              {task.completed ? "Completed" : "Active"}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
              title="Delete Task"
              className="text-red-500 hover:text-red-700 cursor-pointer ml-4 "
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
