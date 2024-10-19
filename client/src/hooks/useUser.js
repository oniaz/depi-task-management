import { useContext } from "react";
import { SessionContext } from "../contexts/UserContext";

const useSession = () => {
    const values = useContext(SessionContext);

    if (!values) {
        throw new Error(
            "Must be inside of a provider to access the user context"
        );
    }

    const { user, setUser } = values;

    return { user, setUser };
};

export default useSession;
