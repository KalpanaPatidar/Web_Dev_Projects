import React, { useState } from "react";
import { createTodo } from "../services/todoApi";

function TodoForm({ onTodoCreated }) {
    const [task, setTask] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!task.trim()) {
            return;
        }

        try {
            setLoading(true);

            const data = await createTodo(task);

            onTodoCreated(data.todo);

            setTask("");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                className="todo-input"
                type="text"
                placeholder="Enter a task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />

            <button
                className="add-btn"
                type="submit"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Todo"}
            </button>
        </form>
    );
}

export default TodoForm;