import RegisterForm from "../components/RegisterForm";
import useSession from "../hooks/useSession";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
    const { session } = useSession();

    return !session ? <RegisterForm /> : <Navigate to="/" />;
};

export default LoginPage;
