import React, { useState } from "react";
import { updateTodo, deleteTodo } from "../services/todoApi";

function TodoItem({ todo, onTodoUpdated, onTodoDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(todo.task);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!task.trim()) {
            return;
        }

        try {
            setLoading(true);

            const data = await updateTodo(todo.id, task);

            onTodoUpdated(data.todo);

            setIsEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);

            await deleteTodo(todo.id);

            onTodoDeleted(todo.id);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="todo-item">
            {isEditing ? (
                <>
                    <input
                        className="todo-edit-input"
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />

                    <div className="todo-actions">
                        <button
                            className="save-btn"
                            onClick={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                        <button
                            className="cancel-btn"
                            onClick={() => {
                                setTask(todo.task);
                                setIsEditing(false);
                            }}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <span className="todo-task">
                        {todo.task}
                    </span>

                    <div className="todo-actions">
                        <button
                            className="edit-btn"
                            onClick={() => setIsEditing(true)}
                            disabled={loading}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default TodoItem;