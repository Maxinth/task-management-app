import { FilterStatus } from "../App";

interface TasksFiltersProps {
  filter: string;
  setFilter: (filter: FilterStatus) => void;
}

const TasksFilters = ({ filter, setFilter }: TasksFiltersProps) => {
  return (
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
  );
};

export default TasksFilters;
