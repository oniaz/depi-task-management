import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RootLayout = () => {
    return (
        <>
            <header className="container my-4 mx-auto flex justify-between items-center">
                <h1 className="text-4xl bold">
                    <Link to="/">Tasks</Link>
                </h1>
                <div className="flex gap-4">
                    {/* Conditionally Render based on user logged in or not*/}
                    <Button>
                        <span className="mr-2 text-xl font-bold">+</span>
                        Add Task
                    </Button>
                    <Button>
                        <Link to="/login">Login/Register</Link>
                    </Button>
                </div>
            </header>
            <main className="container mx-auto">
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;