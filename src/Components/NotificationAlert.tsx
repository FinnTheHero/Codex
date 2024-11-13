const NotificationAlert = ({ notification }: { notification: string }) => {
    return (
        <div
            id="toast-top-right"
            className="custom-alert content fixed flex items-center w-full max-w-fit p-4 rtl:divide-x-reverse rounded-lg top-20 right-1/2 translate-x-1/2 lg:top-5 lg:right-5 lg:translate-x-0"
            role="alert"
            style={{
                color: "#89dceb",
                borderColor: "#89dceb",
            }}
        >
            <div>{notification}</div>
        </div>
    );
};

export default NotificationAlert;
