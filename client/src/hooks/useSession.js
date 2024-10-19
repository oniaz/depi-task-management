import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

const useSession = () => {
    const values = useContext(SessionContext);

    if (!values) {
        throw new Error(
            "Must be inside of a provider to access the user context"
        );
    }

    const { session, setSession } = values;

    return { session, setSession };
};

export default useSession;
