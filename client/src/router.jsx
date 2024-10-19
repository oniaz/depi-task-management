import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import {
    addTask,
    changeTaskStatus,
    deleteTask,
    getTasks,
    updateTask,
} from "./api/tasks";

const tasksLoader = async () => {
    const tasks = await getTasks();
    return { tasks };
};

const taskAction = async ({ request }) => {
    const formData = await request.formData();
    const { action, ...data } = Object.fromEntries(formData);

    switch (action) {
        case "add": {
            await addTask(data);

            break;
        }
        case "delete": {
            await deleteTask(data.taskId);
            break;
        }
        case "edit": {
            await updateTask(data);
            break;
        }
        case "mark-as": {
            await changeTaskStatus(data.taskId, data.newStatus);
            break;
        }
        default:
            console.log("idk");
    }

    return { ok: true };
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: tasksLoader,
            },
            {
                path: "/tasks",
                element: <Navigate to="/" />,
                action: taskAction,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
        ],
    },
]);

export default router;
