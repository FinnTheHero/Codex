import axios from "axios";
import { useError } from "../Contexts/ErrorContext";

export const HandleErr = (err: any, key?: string) => {
    const { addError } = useError();

    if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
            case 401:
                return addError(`Unauthorized`);
            case 404:
                return addError(`Resource not found`);
            case 500:
                return addError(`Internal server error`);
            default:
                return addError(`An error occurred while fetching ${key}`);
        }
    } else {
        return addError(
            `An error occurred while fetching ${key}: ${err.message}`,
        );
    }
};
