import LoginForm from "@/components/LoginForm";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
    const { user } = useUser();

    return !user ? <LoginForm /> : <Navigate to="/" />;
};

export default LoginPage;
