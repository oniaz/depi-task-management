import { Navigate, useFetcher, useLoaderData } from "react-router-dom";
import TasksTable from "../components/table/TasksTable";
import { columns } from "../components/table/columns";
import useSession from "../hooks/useSession";
import { useMemo } from "react";
import { LoaderCircle } from "lucide-react";

const HomePage = () => {
    const { session } = useSession();
    const { tasks } = useLoaderData();
    const fetcher = useFetcher();
    const columnsWithFetcher = useMemo(() => columns(fetcher), [fetcher]);

    // THIS IS JUST FOR TESTING OUT FILTERING
    const TEST_TASKS = [
        {
            id: 1,
            title: "Depi Final Project",
            status: "Todo",
            priority: "High",
            category: "Work",
        },
        {
            id: 2,
            title: "Amr Amein yapping lecture",
            status: "done",
            priority: "Low",
            category: "School",
        },
        {
            id: 3,
            title: "new task",
            status: "in progress",
            priority: "Medium",
            category: "Personal",
        },
        {
            id: 3,
            title: "new task",
            status: "Done",
            priority: "Medium",
            category: "Personal",
        },
    ];

    const isLoading =
        fetcher.state === "loading" || fetcher.state === "submitting";

    return session ? (
        isLoading ? (
            <LoaderCircle className="h-32 w-32 mx-auto my-48 animate-spin" />
        ) : (
            <TasksTable columns={columnsWithFetcher} data={TEST_TASKS} />
        )
    ) : (
        <Navigate to="/login" />
    );
};

export default HomePage;
