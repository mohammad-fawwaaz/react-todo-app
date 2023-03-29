import { useState, useEffect } from "react";
import { TodoItemProps } from "../utils/types";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { Button, Modal } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

type Props = {
  todos: TodoItemProps[];
  handleAddTodo: (data: TodoItemProps) => Promise<void>;
  handleDeleteTodo: (id: number) => Promise<void>;
  handleToggleDone: (todo: TodoItemProps) => Promise<void>;
  handleEdit: (id: number) => void;
};

function Home(props: Props) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "Todo List App";
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-sm-12">
          <h3>Todo List App</h3>
          <Button variant="primary" onClick={handleShowModal}>
            <Icon.PlusLg size={17} title="Add Todo Item" /> Add Todo
          </Button>
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Priority</th>
                <th>Text</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.todos.length > 0 ? (
                props.todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={props.handleToggleDone}
                    onDelete={props.handleDeleteTodo}
                    onEdit={props.handleEdit}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No todos found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TodoForm
            onSubmit={props.handleAddTodo}
            closeModal={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
