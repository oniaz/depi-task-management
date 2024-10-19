import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import { SessionContextProvider } from "./contexts/SessionContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <SessionContextProvider>
            <RouterProvider router={router} />
        </SessionContextProvider>
    </StrictMode>
);
