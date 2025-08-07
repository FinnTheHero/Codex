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
        <div className="fixed flex flex-col flex-nowrap items-center justify-center top-20 left-1/2 transform -translate-x-1/2 z-50 text-center p-2 w-fit">
            {errors.map((err) => (
                <ErrorAlert key={err.id} error={String(err.message)} />
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
