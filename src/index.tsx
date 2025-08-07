import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@fontsource/courier-prime";
import "@fontsource/merriweather";
import "@fontsource/merriweather/700.css";
import "@fortawesome/fontawesome-svg-core";
import { UserProvider } from "./Contexts/UserContext";
import { AppNotificationProvider } from "./Components/AppNotificationProvider";
import { SWRConfig } from "swr";
import { axiosFetcher } from "./Services/apiService";
import { localSyncProvider } from "./Services/cacheService";
import { ContentProvider } from "./Contexts/ContentContext";
import { isAxiosError } from "axios";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <SWRConfig
            value={{
                fetcher: axiosFetcher,
                provider: localSyncProvider("my-swr-cache"),
                onError: (err, key) => {
                    if (isAxiosError(err)) {
                        console.error(
                            `Error fetching ${key}: ${err.response?.statusText}`,
                        );
                    } else {
                        console.error(`Error fetching ${key}: ${err}`);
                    }
                },
            }}
        >
            <AppNotificationProvider>
                <UserProvider>
                    <ContentProvider>
                        <App />
                    </ContentProvider>
                </UserProvider>
            </AppNotificationProvider>
        </SWRConfig>
    </React.StrictMode>,
);
