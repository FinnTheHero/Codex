import { createContext, ReactNode, useContext, useState } from "react";
import LoadingAlert from "../Components/LoadingAlert";
import { LoadingContextType } from "../Types/types";

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {loading && <LoadingAlert />}
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
