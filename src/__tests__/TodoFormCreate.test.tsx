import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, fireEvent, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";

const server = setupServer(
  // Define a mock API endpoint
  rest.post("/api/todos", (req, res, ctx) => {
    const { name, priority, text, due } = req.body;

    // Return a JSON response
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        done: false,
        name,
        priority,
        due,
        text,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("creates a new todo item", async () => {
  render(<HomePage />);

  fireEvent.click(screen.getByText("Add Todo"));

  fireEvent.input(screen.getByLabelText("Name"), {
    target: { value: "Test Todo" },
  });
  fireEvent.input(screen.getByLabelText("Priority"), {
    target: { value: "High" },
  });
  fireEvent.input(screen.getByLabelText("Text"), {
    target: { value: "This is a test todo item" },
  });
  fireEvent.input(screen.getByLabelText("Due Date"), {
    target: { value: "01/01/2023" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Wait for the modal to close or close it
  await screen.findByRole("dialog", { hidden: true });

  // Check that the new todo item is displayed in the list
  expect(screen.getByText("Test Todo")).toBeInTheDocument();
  expect(screen.getByText("High")).toBeInTheDocument();
  expect(screen.getByText("This is a test todo item")).toBeInTheDocument();
  expect(screen.getByText("01/01/2023")).toBeInTheDocument();
});
