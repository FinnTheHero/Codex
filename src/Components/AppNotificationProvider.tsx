import { ReactNode } from "react";
import { ErrorProvider, useError } from "../Contexts/ErrorContext";
import { LoadingProvider, useLoading } from "../Contexts/LoadingContext";
import {
    NotificationProvider,
    useNotification,
} from "../Contexts/NotificationContext";
import ErrorAlert from "./ErrorAlert";
import LoadingAlert from "./LoadingAlert";
import NotificationAlert from "./NotificationAlert";

const DisplayNotifications: React.FC = () => {
    const { loading } = useLoading();
    const { errors } = useError();
    const { notification } = useNotification();

    return (
        <div className="fixed flex flex-col flex-nowrap items-end top-5 left-1/2 transform -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:top-5 lg:right-5 z-50">
            {errors.map((err) => (
                <ErrorAlert error={err.message} />
            ))}
            {loading && <LoadingAlert />}
            {notification && <NotificationAlert notification={notification} />}
        </div>
    );
};

export const AppNotificationProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    return (
        <ErrorProvider>
            <LoadingProvider>
                <NotificationProvider>
                    <DisplayNotifications />
                    {children}
                </NotificationProvider>
            </LoadingProvider>
        </ErrorProvider>
    );
};
