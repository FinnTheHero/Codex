import { Navigate } from "react-router-dom";
import { RequireAuthProps } from "../Types/types";
import { useUser } from "../Contexts/UserContext";

export const DenyUserAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const { user } = useUser();

    // Block logged user from accessing login/register pages
    if (user) {
        return <Navigate to={"/"} />;
    }

    return <>{children}</>;
};

export const RequireAdmin: React.FC<RequireAuthProps> = ({ children }) => {
    const { user } = useUser();

    if (user && user.type === "admin") {
        return <>{children}</>;
    }

    return <Navigate to={"/"} />;
};
