import { TodoItemProps } from "../utils/types";

interface Props {
  todo: TodoItemProps;
  onDelete: (id: number) => Promise<void>;
  onToggle: (todo: TodoItemProps, done: boolean) => Promise<void>;
  onEdit: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const { id, name, priority, text, dueDate, done } = todo;

  return (
    <tr>
      <td>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={done ? true : false}
            onChange={() => onToggle(todo, !done)}
          />
        </div>
      </td>
      <td>{name}</td>
      <td>{priority}</td>
      <td>{text}</td>
      <td>{new Date(dueDate).toLocaleDateString()}</td>
      <td>
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onEdit(todo.id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TodoItem;
