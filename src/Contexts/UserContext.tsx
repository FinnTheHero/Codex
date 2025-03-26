import axios from "axios";
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";
import api from "../Services/apiService";
import { authenticate } from "../Services/authService";
import { User, UserContextType } from "../Types/types";
import { useError } from "./ErrorContext";
import { useLoading } from "./LoadingContext";
import { useNotification } from "./NotificationContext";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { addError } = useError();
    const { setLoading } = useLoading();
    const { setNotification } = useNotification();

    const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();
        const validateUser = async () => {
            setLoading(true);

            try {
                const data = await authenticate();

                if (data.authenticated) {
                    setAuthenticated(true);
                    setUser(data.user);
                    setNotification("Logged back in");
                } else {
                    setUser(null);
                    setAuthenticated(false);
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    addError(err.response?.statusText || "Unknown Error");
                } else {
                    addError("Unknown Error");
                }

                setUser(null);
                setAuthenticated(false);
            } finally {
                setLoading(false);
                setAuthenticated(true);
            }
        };

        validateUser();

        return () => {
            controller.abort();
        };
    }, []);

    const logout = async () => {
        setLoading(true);

        try {
            const response = await api.post(
                "/auth/logout",
                {},
                { withCredentials: true },
            );
            if (response.status === 200) {
                setUser(null);
                setAuthenticated(false);
                setNotification("Logged out successfully");
                window.location.reload();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                addError(err.response?.statusText || "Unknown Error");
            } else {
                throw new Error("Unknown Error");
            }
        } finally {
            setUser(null);
            setAuthenticated(false);
            setLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, authenticated, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider!");
    }
    return context;
};
