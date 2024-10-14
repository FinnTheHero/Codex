const ErrorAlert = ({ error }: { error: string }) => {
    return (
        <div
            id="toast-top-right"
            className="custom-alert fixed flex items-center w-full max-w-xs p-4 space-x-4 divide-x rtl:divide-x-reverse rounded-lg top-5 right-5"
            role="alert"
            style={{ color: "red", borderColor: "red" }}
        >
            <div>{error}</div>
        </div>
    );
};

export default ErrorAlert;
