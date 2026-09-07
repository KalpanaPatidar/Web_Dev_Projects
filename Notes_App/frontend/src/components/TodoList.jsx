import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onTodoUpdated, onTodoDeleted }) {
    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onTodoUpdated={onTodoUpdated}
                    onTodoDeleted={onTodoDeleted}
                />
            ))}
        </div>
    );
}

export default TodoList;