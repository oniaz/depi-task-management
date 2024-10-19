import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getTasks } from "./api/tasks";

const tasksLoader = async () => {
    const tasks = await getTasks();
    return { tasks };
};

const taskAction = async ({ request }) => {
    const formData = await request.formData();
    const { action, ...data } = Object.fromEntries(formData);

    switch (action) {
        case "add": {
            console.log("add");
            break;
        }
        case "delete": {
            console.log("delete");
            break;
        }
        case "edit": {
            console.log("edit");
            break;
        }
        case "mark-as": {
            console.log("mark as");
            break;
        }
        default:
            console.log("idk");
    }

    console.log(data);

    return { ok: true };
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: tasksLoader,
            },
            {
                path: "/tasks",
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
