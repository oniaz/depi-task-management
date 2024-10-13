import { useLoaderData } from "react-router-dom";
import TasksTable from "../components/table/TasksTable";
import { columns } from "../components/table/columns";

const HomePage = () => {
    const { tasks } = useLoaderData();

    return <TasksTable columns={columns} data={tasks} />;
};

export default HomePage;
