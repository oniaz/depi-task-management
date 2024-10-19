import LoginForm from "@/components/LoginForm";
import useSession from "../hooks/useSession";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
    const { session } = useSession();

    return !session ? <LoginForm /> : <Navigate to="/" />;
};

export default LoginPage;
