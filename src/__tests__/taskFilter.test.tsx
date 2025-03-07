import { render, screen, fireEvent } from "@testing-library/react";
import TasksFilters from "../components/TasksFilters";

describe("TasksFilters Component", () => {
  it("renders all filter buttons", () => {
    render(<TasksFilters filter="all" setFilter={jest.fn()} />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("applies the correct class to the active filter", () => {
    render(<TasksFilters filter="active" setFilter={jest.fn()} />);

    const activeButton = screen.getByText("Active");
    expect(activeButton).toHaveClass("bg-black text-yellow-500");
  });

  it("calls setFilter when clicking a filter button", () => {
    const mockSetFilter = jest.fn();
    render(<TasksFilters filter="all" setFilter={mockSetFilter} />);

    const activeButton = screen.getByText("Active");
    fireEvent.click(activeButton);

    expect(mockSetFilter).toHaveBeenCalledWith("active");
  });
});
