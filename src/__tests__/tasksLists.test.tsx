import { render, screen, fireEvent } from "@testing-library/react";
import TasksList from "../components/TasksList";
import { Task } from "../App";

describe("<TasksList /> ", () => {
  const sampleTasks: Task[] = [
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Walk the dog", completed: true },
  ];

  it("renders 'No tasks!' when there are no tasks and filter is 'all'", () => {
    render(
      <TasksList
        filteredTasks={[]}
        deleteTask={jest.fn()}
        filter="all"
        toggleComplete={jest.fn()}
      />
    );

    expect(screen.getByText("No tasks!")).toBeInTheDocument();
  });

  it("renders 'No matching tasks' when there are no tasks matching the filter", () => {
    render(
      <TasksList
        filteredTasks={[]}
        deleteTask={jest.fn()}
        filter="active"
        toggleComplete={jest.fn()}
      />
    );

    expect(screen.getByText("No matching tasks")).toBeInTheDocument();
  });

  it("renders a list of tasks", () => {
    render(
      <TasksList
        filteredTasks={sampleTasks}
        deleteTask={jest.fn()}
        filter="all"
        toggleComplete={jest.fn()}
      />
    );

    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(screen.getByText("Walk the dog")).toBeInTheDocument();
  });

  it("calls toggleComplete when checkbox is clicked", () => {
    const mockToggleComplete = jest.fn();
    render(
      <TasksList
        filteredTasks={sampleTasks}
        deleteTask={jest.fn()}
        filter="all"
        toggleComplete={mockToggleComplete}
      />
    );

    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    expect(mockToggleComplete).toHaveBeenCalledWith(1);
  });

  it("calls deleteTask when delete button is clicked", () => {
    const mockDeleteTask = jest.fn();
    render(
      <TasksList
        filteredTasks={sampleTasks}
        deleteTask={mockDeleteTask}
        filter="all"
        toggleComplete={jest.fn()}
      />
    );

    const deleteButton = screen.getAllByTitle("Delete Task")[0];
    fireEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith(1);
  });
});
