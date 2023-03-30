import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TodoItemProps } from "../utils/types";

interface Props {
  todo?: TodoItemProps;
  onSubmit: (updatedTodo: TodoItemProps) => void;
  defaultValue?: TodoItemProps;
  closeModal?: () => void;
}

const schema = z.object({
  name: z.string().min(2).max(50),
  priority: z.enum(["Low", "Normal", "High"]),
  text: z.string().min(2).max(500),
  dueDate: z.date().refine((val) => {
    const now = new Date();
    return val > now;
  }, "Due date must be in the future."),
});

function TodoForm({
  todo,
  onSubmit,
  defaultValue,
  closeModal = () => {},
}: Props) {
  const { register, handleSubmit, formState, reset } = useForm<TodoItemProps>({
    defaultValues: {
      name: defaultValue?.name || todo?.name || "",
      priority: defaultValue?.priority || todo?.priority || "",
      text: defaultValue?.text || todo?.text || "",
      dueDate: defaultValue?.dueDate
        ? new Date(defaultValue.dueDate).toISOString().split("T")[0]
        : todo?.dueDate
        ? new Date(todo.dueDate).toISOString().split("T")[0]
        : undefined,
    },
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const handleFormSubmit = (data: TodoItemProps) => {
    onSubmit(data);
    reset();
    closeModal();
  };

  return (
    <form
      id="todo-form"
      data-testid="todo-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="form-style"
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          id="name"
          {...register("name")}
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="priority" className="form-label">
          Priority
        </label>
        <select
          className={`form-control ${errors.priority ? "is-invalid" : ""}`}
          id="priority"
          {...register("priority")}
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
        {errors.priority && (
          <div className="invalid-feedback">{errors.priority.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">
          Text
        </label>
        <textarea
          className={`form-control ${errors.text ? "is-invalid" : ""}`}
          id="text"
          {...register("text")}
        ></textarea>
        {errors.text && (
          <div className="invalid-feedback">{errors.text.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">
          Due Date
        </label>
        <input
          type="date"
          className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
          id="dueDate"
          {...register("dueDate", {
            setValueAs: (val: string) => {
              const date = new Date(val);
              return isNaN(date.getTime()) ? undefined : date;
            },
          })}
        />
        {errors.dueDate && (
          <div className="invalid-feedback">{errors.dueDate.message}</div>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default TodoForm;
