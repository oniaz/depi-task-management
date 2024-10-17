export const getTasks = async () => {
    const tasksRes = await fetch("http://localhost:3000/tasks");
    const tasks = await tasksRes.json();
    return tasks;
};

export const addTask = async (newTask) => {
    const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
    });

    const addedTask = await response.json();
    return addedTask;
};

export const deleteTask = async (id) => {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete the task');
    }

    return response.json();
};

export const updateTask = async (id, updatedTask) => {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
        throw new Error('Failed to update the task');
    }

    return response.json();
};
