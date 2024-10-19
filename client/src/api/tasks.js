import baseApi from "./base";

export const getTasks = async () => {
    const tasksRes = await baseApi.get("api/tasks");

    return tasksRes.data.tasks;
};

export const addTask = (task) => {
    return baseApi.post("api/tasks", task);
};

export const changeTaskStatus = async (taskId, newStatus) => {
    const taskRes = await baseApi.patch(`/api/tasks/${taskId}`, {
        newStatus,
    });

    return taskRes.data;
};

export const deleteTask = (taskId) => {
    return baseApi.delete(`/api/tasks/${taskId}`);
};

export const updateTask = (task) => {
    const { id: taskId, ...updatedTask } = task;
    return baseApi.put(`/api/tasks/${taskId}`, updatedTask);
};
