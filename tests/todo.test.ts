import { useStore } from "../src/store/store";
import { TodoItemProps } from "../src/utils/types";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Todo App", () => {
  let todo1: TodoItemProps;
  let todo2: TodoItemProps;

  beforeEach(() => {
    jest.resetAllMocks();

    todo1 = {
      id: 1,
      name: "Task 1",
      priority: "High",
      text: "Do something",
      dueDate: "2023-04-01T12:00:00.000Z",
      done: false,
    };

    todo2 = {
      id: 2,
      name: "Task 2",
      priority: "Medium",
      text: "Do something else",
      dueDate: "2023-04-02T12:00:00.000Z",
      done: false,
    };

    mockedAxios.get.mockResolvedValue({
      data: todo1,
      todo2,
      status: 200,
    });
  });

  it("should add a new todo item", async () => {
    const store = useStore.getState();
    await store.addTodo(todo1);
    expect(store.todos).toEqual([todo1]);
  });

  it("should update an existing todo item", async () => {
    const store = useStore.getState();
    await store.addTodo(todo1);
    const updatedTodo = { ...todo1, name: "Updated Task 1" };
    await store.updateTodo(updatedTodo);
    expect(store.todos).toEqual([updatedTodo]);
  });

  it("should delete an existing todo item", async () => {
    const store = useStore.getState();
    await store.addTodo(todo1);
    await store.addTodo(todo2);
    await store.deleteTodo(todo1.id);
    expect(store.todos).toEqual([todo2]);
  });

  it("should toggle an existing todo item", async () => {
    const store = useStore.getState();
    await store.addTodo(todo1);
    await store.toggleTodo({
      ...todo1,
      done: true,
    });
    expect(store.todos[0].done).toBe(true);
  });

  it("should fetch all todo items", async () => {
    const store = useStore.getState();
    await store.addTodo(todo1);
    await store.addTodo(todo2);
    await store.fetchTodos();
    expect(store.todos).toEqual([todo1, todo2]);
  });

  it("should fetch a specific todo item by id", async () => {
    const store = useStore.getState();
    await store.addTodo(todo1);
    await store.addTodo(todo2);
    await store.fetchTodos(String(todo1.id));
    expect(store.todos).toEqual([todo1]);
  });
});
