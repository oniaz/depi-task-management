import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <main className="container mx-auto px-2 md:px-4">
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
