import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

const useSession = () => {
    const values = useContext(SessionContext);

    if (!values) {
        throw new Error(
            "Must be inside of a provider to access the session context"
        );
    }

    const { session, login, logout } = values;

    return { session, login, logout };
};

export default useSession;
