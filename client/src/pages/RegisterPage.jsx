import RegisterForm from "../components/RegisterForm";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
    const { user } = useUser();

    return !user ? <RegisterForm /> : <Navigate to="/" />;
};

export default LoginPage;
