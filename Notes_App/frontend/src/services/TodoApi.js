const API = "http://localhost:5000/api/todos";

export async function getTodos() {
    const response = await fetch(API);

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }

    return response.json();
}

export async function createTodo(task) {
    const response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: task
        })
    });

    if (!response.ok) {
        throw new Error("Failed to create todo");
    }

    return response.json();
}

export async function updateTodo(id, task) {
    const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: task
        })
    });

    if (!response.ok) {
        throw new Error("Failed to update todo");
    }

    return response.json();
}

export async function deleteTodo(id) {
    const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete todo");
    }

    return response.json();
}