import { render, fireEvent, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const todos = {
  id: 1,
  done: true,
  name: "Test 1",
  priority: "High",
  due: "01/01/2024",
  text: "Test text 1",
};

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
    target: { value: "Test 1" },
  });
  fireEvent.input(screen.getByLabelText("Priority"), {
    target: { value: "High" },
  });
  fireEvent.input(screen.getByLabelText("Text"), {
    target: { value: "Test text 1" },
  });
  fireEvent.input(screen.getByLabelText("Due Date"), {
    target: { value: "01/01/2024" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Wait for the modal to close or close it
  await screen.findByRole("dialog", { hidden: true });

  // Check that the new todo item is displayed in the list
  expect(screen.getByText("Test 1")).toBeInTheDocument();
  expect(screen.getByText("High")).toBeInTheDocument();
  expect(screen.getByText("Test text 1")).toBeInTheDocument();
  expect(screen.getByText("01/01/2024")).toBeInTheDocument();

  // Check that the API is called with the correct data
  expect(mockedAxios.post).toHaveBeenCalledWith("/api/todos", {
    name: "Test Todo",
    priority: "High",
    text: "Test text 1",
    due: "01/01/2024",
  });
});
