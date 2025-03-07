import { MdAdd } from "react-icons/md";

interface TaskInputBoxProps {
  taskText: string;
  setTaskText: (text: string) => void;
  addTask: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TaskInputBox = ({
  taskText,
  setTaskText,
  addTask,
  handleKeyDown,
}: TaskInputBoxProps) => {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task..."
        className="flex-1 p-2 border rounded border-gray-300 outline-none"
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={addTask}
        disabled={!taskText.trim()}
        className={`bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 duration-150 ease-in-out ${
          !taskText.trim() ? "!cursor-not-allowed" : ""
        }`}
      >
        <MdAdd size={20} className="!scale-[1.4]" />
      </button>
    </div>
  );
};

export default TaskInputBox;
