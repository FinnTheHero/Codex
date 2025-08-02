import { Navigate, useNavigate, useParams } from "react-router-dom";
import { RequireAuthProps } from "../Types/types";
import { useUser } from "../Contexts/UserContext";
import { useLoading } from "../Contexts/LoadingContext";
import { authenticate } from "../Services/authService";
import { useError } from "../Contexts/ErrorContext";
import { useEffect } from "react";
import { useContent } from "../Contexts/ContentContext";

export const DenyUserAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const { user } = useUser();
    const { loading } = useLoading();

    if (loading) {
        return <></>;
    }

    if (user) {
        return <Navigate to={"/"} />;
    }

    return <>{children}</>;
};

export const RequireUser: React.FC<RequireAuthProps> = ({ children }) => {
    const { user } = useUser();
    const { loading } = useLoading();
    const { addError } = useError();

    if (loading) {
        return <></>;
    }

    if (!user) {
        addError("Valid User account required for Uploading!");
        return <Navigate to={"/login"} />;
    }

    return <>{children}</>;
};

export const EditPageAccess: React.FC<RequireAuthProps> = ({ children }) => {
    const { id_novel } = useParams();

    const { user } = useUser();
    const { addError } = useError();

    const { novel } = useContent();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            addError("Valid User account required for Editing!");
            return navigate("/login");
        }

        if (!id_novel) {
            addError("Novel ID is required for Editing!");
            return navigate("/novels");
        }

        if (!novel) {
            addError("Novel not found!");
            return navigate("/novels");
        }

        if (novel.author !== user.username && user.type !== "Admin") {
            addError("You are not authorized to edit!");
            return navigate(`/novels/${id_novel}`);
        }
    }, []);

    return <>{children}</>;
};

export const RequireAdmin: React.FC<RequireAuthProps> = ({ children }) => {
    const { addError } = useError();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await authenticate();

                if (!data.authenticated) {
                    return navigate("/login");
                }

                if (!data.user) {
                    return navigate("/login");
                }

                if (data.user && data.user.type !== "admin") {
                    return navigate("/login");
                }
            } catch (err) {
                addError((err as Error).message);
                return navigate("/login");
            }
        };

        checkAuth();
    }, []);

    return <>{children}</>;
};
