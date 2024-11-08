import { useEffect, useState } from "react";
import api from "./apiService";

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        api.get("/validate")
            .then((response) => setAuthenticated(response.data.authenticated))
            .catch(() => {
                setAuthenticated(false);
            });
    }, []);

    return authenticated;
};

export default useAuth;
