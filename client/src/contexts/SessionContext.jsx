import { createContext, useState, useEffect } from "react";

// Create the context
export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
    // Initialize session with null, but load any existing token from localStorage
    const [session, setSession] = useState(null);

    // Load the session from localStorage if it exists when the component mounts
    useEffect(() => {
        const savedToken = localStorage.getItem('jwt_token');
        if (savedToken) {
            setSession({ token: savedToken });
        }
    }, []);

    // Login function to set the session and store the token in localStorage
    const login = (token) => {
        setSession({ token });
        localStorage.setItem('jwt_token', token);
    };

    // Logout function to clear the session and remove the token from localStorage
    const logout = () => {
        setSession(null);
        localStorage.removeItem('jwt_token');
    };

    return (
        <SessionContext.Provider value={{ session, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};
