import useAuth from "../Services/authService";
import { Navigate } from "react-router-dom";
import { RequireAuthProps } from "../Types/types";

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const authenticated = useAuth();

    if (!authenticated) {
        return <Navigate to={"/login"} />;
    }

    return <>{children}</>;
};

export default RequireAuth;
