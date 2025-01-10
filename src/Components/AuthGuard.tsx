import { Navigate, useNavigate, useParams } from "react-router-dom";
import { RequireAuthProps } from "../Types/types";
import { useUser } from "../Contexts/UserContext";
import { useLoading } from "../Contexts/LoadingContext";
import { authenticate } from "../Services/authService";
import { useError } from "../Contexts/ErrorContext";
import { useEffect } from "react";
import { useSearchHandler } from "./SearchHandler";

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

export const EditPageAccess: React.FC<RequireAuthProps> = ({ children }) => {
    const { novelTitle } = useParams();

    const { user } = useUser();

    const navigate = useNavigate();

    const { searchNovelHandler } = useSearchHandler();

    useEffect(() => {
        const handleNovelSearch = async () => {
            if (!novelTitle || !user) {
                return navigate("/login");
            }

            try {
                await searchNovelHandler({
                    title_novel: novelTitle,
                    setNovel: (novel) => {
                        if (
                            user.username !== novel.author &&
                            user.type !== "admin"
                        ) {
                            return navigate("/login");
                        }
                    },
                });
            } catch (err) {
                return navigate("/login");
            }
        };
        handleNovelSearch();
    }, []);

    return <>{children}</>;
};

export const RequireAdmin: React.FC<RequireAuthProps> = ({ children }) => {
    const { setError } = useError();
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
                setError((err as Error).message);
                return navigate("/login");
            }
        };

        checkAuth();
    }, []);

    return <>{children}</>;
};
