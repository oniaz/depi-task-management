import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import { UserContextProvider } from "./contexts/UserContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
    </StrictMode>
);
