const ErrorAlert = ({ error }: { error: string }) => {
    return (
        <div
            className="custom-alert fixed flex items-center w-full max-w-fit p-4 rtl:divide-x-reverse rounded-lg top-20 right-1/2 translate-x-1/2 lg:top-5 lg:right-5 lg:translate-x-0"
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
