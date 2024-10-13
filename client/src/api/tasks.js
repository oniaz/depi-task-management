export const getTasks = async () => {
    const tasksRes = await fetch("http://localhost:3000/tasks");
    const tasks = await tasksRes.json();

    return tasks;
};
