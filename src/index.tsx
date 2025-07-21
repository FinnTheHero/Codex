import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/courier-prime";
import "@fontsource/merriweather";
import "@fontsource/merriweather/700.css";
import "@fortawesome/fontawesome-svg-core";
import { UserProvider } from "./Contexts/UserContext";
import { AppNotificationProvider } from "./Components/AppNotificationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <AppNotificationProvider>
            <UserProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </UserProvider>
        </AppNotificationProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
