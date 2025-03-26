const ErrorAlert = ({ error }: { error: string }) => {
    return (
        <div
            className="custom-alert flex items-center w-full max-w-fit p-4 my-2 rounded-lg"
            style={{
                color: "red",
                borderColor: "red",
            }}
        >
            <div>{error}</div>
        </div>
    );
};

export default ErrorAlert;
