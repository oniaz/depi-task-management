import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import AddTaskDialog from "@/components/dialog/AddTask"
import { useState } from "react";


=======
import AddTaskDialog from "@/components/AddTaskDialog";
>>>>>>> trunk

const RootLayout = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <header className="container px-2 md:px-4 my-6 mx-auto flex justify-between items-center">
                <h1 className="text-5xl font-bold">
                    <Link to="/">Tasks</Link>
                </h1>
                <div className="flex gap-4">
                    {/* Conditionally Render based on user logged in or not*/}
<<<<<<< HEAD
                    <Button onClick={openDialog}>
                        <span className="mr-2 text-xl font-bold">+</span>
                        Add Task
                    </Button>
=======
                    <AddTaskDialog />
>>>>>>> trunk
                    <Button>
                        <Link to="/login">Login/Register</Link>
                    </Button>
                </div>
            </header>
            <main className="container mx-auto px-2 md:px-4">
                <Outlet />
            </main>
            <AddTaskDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} />
        </>
    );
};

export default RootLayout;
