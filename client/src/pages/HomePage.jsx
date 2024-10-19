import { Navigate, useLoaderData } from "react-router-dom";
import TasksTable from "../components/table/TasksTable";
import { columns } from "../components/table/columns";
import useSession from "../hooks/useSession";

const HomePage = () => {
    const { session } = useSession();
    const { tasks } = useLoaderData();

    return session ? (
        <>
            <TasksTable columns={columns} data={tasks} />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default HomePage;
