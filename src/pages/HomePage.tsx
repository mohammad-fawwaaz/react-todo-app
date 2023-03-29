import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TodoItemProps } from "../utils/types";
import Home from "../components/Home";
import { useStore } from "../store/store";

function HomePage() {
  const navigate = useNavigate();
  const { todos, fetchTodos, addTodo, deleteTodo, toggleTodo } = useStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (data: TodoItemProps) => {
    try {
      await addTodo({
        ...data,
        dueDate: new Date(data.dueDate).toISOString(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDone = async (todo: TodoItemProps) => {
    try {
      await toggleTodo({
        ...todo,
        done: !todo.done,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id: number) => {
    const selectedTodo = todos.find((todo) => todo.id === id);
    if (selectedTodo) {
      navigate(`/edit/${id}`, { state: { data: selectedTodo } });
    }
  };

  return (
    <Home
      todos={todos}
      handleAddTodo={handleAddTodo}
      handleDeleteTodo={handleDeleteTodo}
      handleToggleDone={handleToggleDone}
      handleEdit={handleEdit}
    />
  );
}

export default HomePage;
