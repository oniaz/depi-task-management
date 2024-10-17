import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    // should be initialized null but I initialized it with an empty object for testing
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
