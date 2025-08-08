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
import { ContentProvider } from "./Contexts/ContentContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <AppNotificationProvider>
            <UserProvider>
                <ContentProvider>
                    <App />
                </ContentProvider>
            </UserProvider>
        </AppNotificationProvider>
    </React.StrictMode>,
);
