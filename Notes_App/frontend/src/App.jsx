import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { getTodos } from "./services/todoApi";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await getTodos();
                setTodos(data);
            } catch (error) {
                setError("Failed to load todos");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    const handleTodoCreated = (newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const handleTodoUpdated = (updatedTodo) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            )
        );
    };

    const handleTodoDeleted = (deletedId) => {
        setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo.id !== deletedId)
        );
    };

    return (
        <div className="todo-container">
            <h1>Todo App</h1>

            <TodoForm onTodoCreated={handleTodoCreated} />

            {loading && <p className="status-message">Loading...</p>}

            {error && <p className="error-message">{error}</p>}

            {!loading && !error && todos.length === 0 && (
                <p className="empty-message">
                    No todos yet. Add your first task!
                </p>
            )}

            {!loading && !error && todos.length > 0 && (
                <TodoList
                    todos={todos}
                    onTodoUpdated={handleTodoUpdated}
                    onTodoDeleted={handleTodoDeleted}
                />
            )}
        </div>
    );
}

export default App;