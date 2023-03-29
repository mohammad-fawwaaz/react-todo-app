import create from "zustand";
import { TodoItemProps } from "../utils/types";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo as updatedTodoApi,
  toggleTodo as toggledTodoApi,
} from "../utils/api";

type State = {
  todos: TodoItemProps[];
  isLoading: boolean;
  addTodo: (todo: TodoItemProps) => Promise<void>;
  updateTodo: (todo: TodoItemProps) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (todo: TodoItemProps) => Promise<void>;
  fetchTodos: (id?: string) => Promise<void>;
};

export const useStore = create<State>((set) => ({
  todos: [],
  isLoading: false,
  addTodo: async (todo: TodoItemProps) => {
    const dueDate = new Date(todo.dueDate).toISOString();
    await createTodo({ ...todo, dueDate });
    set((state) => ({ todos: [...state.todos, { ...todo, dueDate }] }));
  },
  updateTodo: async (todo: TodoItemProps) => {
    const todoList = await fetchTodos();
    set({ todos: todoList });

    const dueDate = new Date(todo.dueDate).toISOString();
    const updatedTodo = { ...todo, dueDate };
    await updatedTodoApi(updatedTodo);

    set((state) => {
      const index = state.todos.findIndex((t) => t.id === todo.id);
      const updatedTodos = [...state.todos];
      updatedTodos[index] = updatedTodo;

      return {
        todos: updatedTodos,
      };
    });
  },
  deleteTodo: async (id: number) => {
    await deleteTodo(id);
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    }));
  },
  toggleTodo: async (todo: TodoItemProps) => {
    const toggledTodo = { ...todo, done: todo.done };
    await toggledTodoApi(toggledTodo);
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? toggledTodo : t)),
    }));
  },
  fetchTodos: async (id?: string) => {
    set({ isLoading: true });
    const todos = await fetchTodos(id ? Number(id) : undefined);
    set({ todos, isLoading: false });
  },
}));
