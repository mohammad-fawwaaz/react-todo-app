import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoForm from "../src/components/TodoForm";

describe("TodoForm", () => {
  it("should render with default values", () => {
    render(<TodoForm onSubmit={() => {}} />);
    const formElement = screen.getByTestId("todo-form");
    expect(formElement).toBeInTheDocument();

    expect(screen.getByLabelText(/name/i)).toHaveValue("");
    expect(screen.getByLabelText(/priority/i)).toHaveValue("");
    expect(screen.getByLabelText(/text/i)).toHaveValue("");
    expect(screen.getByLabelText(/due date/i)).toHaveValue("");
  });

  it("should show errors on invalid form submission", async () => {
    const onSubmitMock = jest.fn();
    render(<TodoForm onSubmit={onSubmitMock} />);

    const nameInput = screen.getByLabelText("Name");
    const prioritySelect = screen.getByLabelText("Priority");
    const textInput = screen.getByLabelText("Text");
    const dueDateInput = screen.getByLabelText("Due Date");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const date = new Date();
    date.setDate(date.getDate() - 1); // set due date to a past date
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;

    const formData = {
      name: "",
      priority: "",
      text: "",
      dueDate: formattedDate,
    };

    fireEvent.change(nameInput, { target: { value: formData.name } });
    fireEvent.change(prioritySelect, { target: { value: formData.priority } });
    fireEvent.change(textInput, { target: { value: formData.text } });
    fireEvent.change(dueDateInput, { target: { value: formData.dueDate } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/priority is required/i)).toBeInTheDocument();
      expect(screen.getByText(/text is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/due date must be in the future/i)
      ).toBeInTheDocument();
    });
  });

  it("should submit a valid form", async () => {
    const onSubmitMock = jest.fn();
    render(<TodoForm onSubmit={onSubmitMock} />);

    const nameInput = screen.getByLabelText("Name");
    const prioritySelect = screen.getByLabelText("Priority");
    const textInput = screen.getByLabelText("Text");
    const dueDateInput = screen.getByLabelText("Due Date");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;

    const formData = {
      name: "Test Todo",
      priority: "High",
      text: "This is a test todo item.",
      dueDate: formattedDate,
    };

    fireEvent.change(nameInput, { target: { value: formData.name } });
    fireEvent.change(prioritySelect, { target: { value: formData.priority } });
    fireEvent.change(textInput, { target: { value: formData.text } });
    fireEvent.change(dueDateInput, { target: { value: formData.dueDate } });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: formData.name,
        priority: formData.priority,
        text: formData.text,
        dueDate: formattedDate,
      })
    );
  });
});
