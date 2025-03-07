import { FilterStatus } from "../App";

interface TasksFiltersProps {
  filter: string;
  setFilter: (filter: FilterStatus) => void;
}

const TasksFilters = ({ filter, setFilter }: TasksFiltersProps) => {
  const filterLookUP = {
    all: "bg-gray-900 text-white hover:bg-gray-400",
    active: "bg-black text-yellow-500 hover:bg-gray-800",
    completed: "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <div className="flex flex-start  gap-2 mb-4 flex-wrap">
      {(["all", "active", "completed"] as const).map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`px-3 py-1 rounded cursor-pointer  transition-all ease-in-out ${
            filter === status ? filterLookUP[filter] : "bg-gray-200"
          } `}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TasksFilters;
