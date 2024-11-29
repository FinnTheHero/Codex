import { Navigate } from "react-router-dom";
import { RequireAuthProps } from "../Types/types";
import { useUser } from "../Contexts/UserContext";
import { useLoading } from "../Contexts/LoadingContext";

export const DenyUserAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const { user } = useUser();
    const { loading } = useLoading();

    if (loading) {
        return <></>;
    }

    // Block logged user from accessing login/register pages
    if (user) {
        return <Navigate to={"/"} />;
    }

    return <>{children}</>;
};

export const RequireAdmin: React.FC<RequireAuthProps> = ({ children }) => {
    const { user } = useUser();
    const { loading } = useLoading();

    if (loading) {
        return <></>;
    }

    // Allow only admin to access
    if (user && user.type === "admin") {
        return <>{children}</>;
    }

    return <Navigate to={"/"} />;
};
