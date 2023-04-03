import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoForm from "../components/TodoForm";

describe("TodoForm", () => {
  test("renders the form with empty fields", () => {
    render(<TodoForm onSubmit={() => {}} />);
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Priority")).toHaveValue("");
    expect(screen.getByLabelText("Text")).toHaveValue("");
    expect(screen.getByLabelText("Due Date")).toHaveValue("");
  });

  test("displays an error message when submitting with invalid data", async () => {
    render(<TodoForm onSubmit={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toHaveClass("is-invalid");
      expect(screen.getByLabelText("Priority")).toHaveClass("is-invalid");
      expect(screen.getByLabelText("Text")).toHaveClass("is-invalid");
      expect(screen.getByLabelText("Due Date")).toHaveClass("is-invalid");
    });
  });
});
