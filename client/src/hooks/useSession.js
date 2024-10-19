import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useUser = () => {
    const values = useContext(UserContext);

    if (!values) {
        throw new Error(
            "Must be inside of a provider to access the user context"
        );
    }

    const { session, setSession } = values;

    return { session, setSession };
};

export default useUser;
