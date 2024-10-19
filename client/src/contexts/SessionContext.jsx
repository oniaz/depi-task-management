import { createContext, useState } from "react";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
    // should be initialized null but I initialized it with a token for testing
    const [session, setSession] = useState();

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};
