import { Button } from "@/components/ui/button";
import AddTaskDialog from "@/components/AddTaskDialog";
import { Link } from "react-router-dom";
import useSession from "../hooks/useSession";

const Navbar = () => {
    const { session } = useSession();

    return (
        <header className="container px-2 md:px-4 my-6 mx-auto flex justify-between items-center">
            <h1 className="text-5xl font-bold">
                <Link to="/">Tasks</Link>
            </h1>
            <div className="flex items-center gap-4">
                {/* Conditionally Render based on user logged in or not*/}
                {session ? (
                    <>
                        <Button variant="ghost">Logout</Button>
                        <div className="h-8 w-px bg-gray-800 inline-block" />
                        <AddTaskDialog />
                    </>
                ) : (
                    <>
                        <Button variant="ghost">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button variant="ghost">
                            <Link to="/register">Register</Link>
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
