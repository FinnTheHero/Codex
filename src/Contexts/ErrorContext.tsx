import { createContext, ReactNode, useContext, useState } from "react";
import { ErrorContextType, ErrorNotification } from "../Types/types";

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [errors, setErrors] = useState<ErrorNotification[]>([]);

    const addError = (msg: string) => {
        const id = new Date().getTime();
        const newError: ErrorNotification = { id, message: msg };
        setErrors((prev) => [...prev, newError]);

        setTimeout(() => {
            setErrors((prev) => prev.filter((error) => error.id !== id));
        }, 3000);
    };

    const isDuplicateError = (msg: string) => {
        return errors.some((error) => error.message === msg);
    };

    const removeError = (id: number) => {
        setErrors((prev) => prev.filter((error) => error.id !== id));
    };

    return (
        <ErrorContext.Provider value={{ errors, addError, removeError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError must be used within a ErrorProvider!");
    }
    return context;
};
