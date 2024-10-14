import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AddTaskDialog from "@/components/AddTaskDialog";

const RootLayout = () => {
    return (
        <>
            <header className="container px-2 md:px-4 my-6 mx-auto flex justify-between items-center">
                <h1 className="text-5xl font-bold">
                    <Link to="/">Tasks</Link>
                </h1>
                <div className="flex gap-4">
                    {/* Conditionally Render based on user logged in or not*/}
                    <AddTaskDialog />
                    <Button>
                        <Link to="/login">Login/Register</Link>
                    </Button>
                </div>
            </header>
            <main className="container mx-auto px-2 md:px-4">
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
