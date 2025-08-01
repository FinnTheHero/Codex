import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { NotificationContextType } from "../Types/types";

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined,
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        if (notification !== null) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a ErrorProvider!");
    }
    return context;
};
