import { Navigate, useLoaderData } from "react-router-dom";
import TasksTable from "../components/table/TasksTable";
import { columns } from "../components/table/columns";
import useUser from "../hooks/useUser";

const HomePage = () => {
    const { user } = useUser();
    const { tasks } = useLoaderData();

    return user ? (
        <TasksTable columns={columns} data={tasks} />
    ) : (
        <Navigate to="/login" />
    );
};

export default HomePage;
