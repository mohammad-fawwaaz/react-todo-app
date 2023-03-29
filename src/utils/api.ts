import axios, { AxiosResponse } from "axios";
import { TodoItemProps } from "./types";

const BASE_URL = "http://localhost:3001";

export const fetchTodos = async (id?: number): Promise<TodoItemProps[]> => {
  const url = id ? `${BASE_URL}/todos/${id}` : `${BASE_URL}/todos`;
  const response: AxiosResponse<TodoItemProps[]> = await axios.get(url);
  return response.data;
};

export const createTodo = async (
  todo: TodoItemProps
): Promise<TodoItemProps> => {
  const formattedTodo = {
    ...todo,
    dueDate: new Date(todo.dueDate),
    done: false,
  };
  const response: AxiosResponse<TodoItemProps> = await axios.post(
    `${BASE_URL}/todos`,
    formattedTodo
  );
  return response.data;
};

export const updateTodo = async (
  todo: TodoItemProps
): Promise<TodoItemProps> => {
  const formattedTodo = {
    ...todo,
    dueDate: new Date(todo.dueDate),
  };
  const response: AxiosResponse<TodoItemProps> = await axios.put(
    `${BASE_URL}/todos/${todo.id}`,
    formattedTodo
  );
  return response.data;
};

export const toggleTodo = async (
  todo: TodoItemProps
): Promise<TodoItemProps> => {
  const updatedTodo = {
    ...todo,
    done: todo.done,
  };
  const response: AxiosResponse<TodoItemProps> = await axios.put(
    `${BASE_URL}/todos/${todo.id}`,
    updatedTodo
  );
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/todos/${id}`);
};
