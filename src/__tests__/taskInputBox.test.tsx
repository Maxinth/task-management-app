import { render, screen, fireEvent } from "@testing-library/react";
import TaskInputBox from "../components/TaskInputBox";
import "@testing-library/jest-dom";

const mockSetTaskText = jest.fn();
const mockAddTask = jest.fn();
const mockHandleKeyDown = jest.fn();

describe("<TaskInputBox /> ", () => {
  it("renders input and button", () => {
    render(
      <TaskInputBox
        taskText=""
        setTaskText={mockSetTaskText}
        addTask={mockAddTask}
        handleKeyDown={mockHandleKeyDown}
      />
    );
    expect(screen.getByPlaceholderText("Enter a task...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("updates input value when typed into", () => {
    render(
      <TaskInputBox
        taskText=""
        setTaskText={mockSetTaskText}
        addTask={mockAddTask}
        handleKeyDown={mockHandleKeyDown}
      />
    );
    const input = screen.getByPlaceholderText("Enter a task...");
    fireEvent.change(input, { target: { value: "New Task" } });
    expect(mockSetTaskText).toHaveBeenCalledWith("New Task");
  });

  it("disables the button when input is empty", () => {
    render(
      <TaskInputBox
        taskText=""
        setTaskText={mockSetTaskText}
        addTask={mockAddTask}
        handleKeyDown={mockHandleKeyDown}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("enables the button when input has text", () => {
    render(
      <TaskInputBox
        taskText="Task"
        setTaskText={mockSetTaskText}
        addTask={mockAddTask}
        handleKeyDown={mockHandleKeyDown}
      />
    );
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });

  it("calls addTask when button is clicked", () => {
    render(
      <TaskInputBox
        taskText="Task"
        setTaskText={mockSetTaskText}
        addTask={mockAddTask}
        handleKeyDown={mockHandleKeyDown}
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockAddTask).toHaveBeenCalled();
  });

  it("calls handleKeyDown when a key is pressed in input", () => {
    render(
      <TaskInputBox
        taskText="Task"
        setTaskText={mockSetTaskText}
        addTask={mockAddTask}
        handleKeyDown={mockHandleKeyDown}
      />
    );
    const input = screen.getByPlaceholderText("Enter a task...");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockHandleKeyDown).toHaveBeenCalled();
  });
});
