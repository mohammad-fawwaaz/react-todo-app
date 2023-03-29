import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { TodoItemProps } from "../utils/types";
import Edit from "../components/Edit";

export const EditPage = () => {
  const navigation = useNavigate();
  const { todos, fetchTodos, updateTodo, isLoading } = useStore();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchTodos(id);
    }
  }, [fetchTodos, id]);

  let todoToEdit: TodoItemProps | null = null;

  if (Array.isArray(todos)) {
    todoToEdit = todos.find((todo) => todo.id === Number(id)) || null;
  } else {
    todoToEdit = todos;
  }

  const handleSave = (updatedTodo: TodoItemProps) => {
    updatedTodo.id = Number(id);
    updateTodo(updatedTodo);
    navigation("/");
  };

  if (isLoading || !todoToEdit) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Edit Todo</h1>
      <Edit onSave={handleSave} todo={todoToEdit} />
    </div>
  );
};
