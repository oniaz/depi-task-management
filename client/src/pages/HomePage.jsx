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

    const isLoading =
        fetcher.state === "loading" || fetcher.state === "submitting";

    return session ? (
        isLoading ? (
            <LoaderCircle className="h-32 w-32 mx-auto my-48 animate-spin" />
        ) : (
            <TasksTable columns={columnsWithFetcher} data={tasks} />
        )
    ) : (
        <Navigate to="/login" />
    );
};

export default HomePage;
