import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import { TodoItemProps } from "../utils/types";

interface EditProps {
  todo: TodoItemProps;
  onSave: (updatedTodo: TodoItemProps) => void;
}

function Edit({ todo, onSave }: EditProps) {
  const handleSubmit = async (updatedTodo: TodoItemProps) => {
    onSave(updatedTodo);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-sm-6">
          <Link to="/" className="btn btn-secondary">
            Go Back
          </Link>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-6">
          <TodoForm
            defaultValue={{
              id: todo.id,
              name: todo.name,
              priority: todo.priority,
              text: todo.text,
              dueDate: todo.dueDate,
              done: todo.done,
            }}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Edit;
