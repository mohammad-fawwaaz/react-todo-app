import { render, fireEvent, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const todos = [
  {
    id: 1,
    done: true,
    name: "Test 1",
    priority: "High",
    due: "01/01/2024",
    text: "Test text 1",
  },
  {
    id: 2,
    done: false,
    name: "Test 2",
    priority: "medium",
    due: "01/01/2024",
    text: "Test text 2",
  },
];

beforeEach(() => {
  jest.resetAllMocks();
  mockedAxios.get.mockResolvedValue({
    data: todos,
    status: 200,
    statusText: "Ok",
  });
  mockedAxios.post.mockResolvedValue({
    data: todos,
    status: 200,
    statusText: "Ok",
  });
});

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
    target: { value: "2023-05-01" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Wait for the modal to close or close it
  await screen.findByRole("dialog", { hidden: true });

  // Check that the new todo item is displayed in the list
  expect(screen.getByText("Test Todo")).toBeInTheDocument();
  expect(screen.getByText("High")).toBeInTheDocument();
  expect(screen.getByText("This is a test todo item")).toBeInTheDocument();
  expect(screen.getByText("May 1, 2023")).toBeInTheDocument();

  // Check that the API is called with the correct data
  expect(mockedAxios.post).toHaveBeenCalledWith("/api/todos", {
    name: "Test Todo",
    priority: "High",
    text: "This is a test todo item",
    due: "2023-05-01",
  });
});
