import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/courier-prime";
import "@fortawesome/fontawesome-svg-core";
import { UserProvider } from "./Contexts/UserContext";
import { ErrorProvider } from "./Contexts/ErrorContext";
import { LoadingProvider } from "./Contexts/LoadingContext";
import { NotificationProvider } from "./Contexts/NotificationContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <ErrorProvider>
            <LoadingProvider>
                <NotificationProvider>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </NotificationProvider>
            </LoadingProvider>
        </ErrorProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
