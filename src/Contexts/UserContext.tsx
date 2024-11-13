import axios from "axios";
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";
import api from "../Services/apiService";
import { User, UserContextType } from "../Types/types";
import { useError } from "./ErrorContext";
import { useLoading } from "./LoadingContext";
import { useNotification } from "./NotificationContext";

const UserContext = createContext<UserContextType | undefined>(undefined);

const url = process.env.REACT_APP_API;

export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { setError } = useError();
    const { setLoading } = useLoading();
    const { setNotification } = useNotification();

    const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const validateUser = async () => {
            setError(null);
            setLoading(true);

            try {
                const response = await api.get("/auth/validate", {
                    withCredentials: true,
                });
                if (response.data.authenticated) {
                    setAuthenticated(true);
                    setUser(response.data.user);
                    setNotification("Logged back in");
                } else {
                    setUser(null);
                    setAuthenticated(false);
                }
            } catch (err) {
                setUser(null);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        validateUser();
    }, [setError, setLoading, setNotification]);

    const logout = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                url + "/auth/logout",
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
            setError((err as Error).message);
        } finally {
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
