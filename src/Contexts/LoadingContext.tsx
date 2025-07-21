import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { LoadingContextType } from "../Types/types";
import { useError } from "./ErrorContext";

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { addError } = useError();

    useEffect(() => {
        if (loading === true) {
            const timer = setTimeout(() => {
                setLoading(false);
                addError("Loading Timed Out!");
            }, 30000);

            return () => clearTimeout(timer);
        }
    }, [loading]);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider!");
    }
    return context;
};
