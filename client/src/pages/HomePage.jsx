import TasksTable from "../components/table/TasksTable";
import { columns } from "../components/table/columns";

const HomePage = () => {
    const dummyData = [
        {
            title: "Depi Final Project",
            status: "Todo",
            priority: "High",
            category: "Work",
        },
        {
            title: "Amr Amein yapping lecture",
            status: "Todo",
            priority: "Low",
            category: "School",
        },
    ];

    return <TasksTable columns={columns} data={dummyData} />;
};

export default HomePage;
