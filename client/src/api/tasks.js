import baseApi from "./base";

export const getTasks = async () => {
    const tasksRes = await baseApi.get("api/tasks");

    return tasksRes.data.tasks;
};

export const addTask = (task) => {
    return baseApi.post("api/tasks", task);
};

export const changeTaskStatus = async (taskId, newStatus) => {
    console.log("TASKID: ", taskId);
    console.log("NEW STATUS: ", newStatus);
    const taskRes = await baseApi.patch(`/api/tasks/${taskId}`, {
        newStatus,
    });

    return taskRes.data;
};
