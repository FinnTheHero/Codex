import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import ErrorAlert from "../Components/ErrorAlert";
import { ErrorContextType } from "../Types/types";

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (error !== null) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {error && <ErrorAlert error={error} />}
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
