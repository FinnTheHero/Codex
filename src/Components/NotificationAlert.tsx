const NotificationAlert = ({ notification }: { notification: string }) => {
    return (
        <div
            className="custom-alert content flex items-center text-center max-w-fit w-fit px-4 py-2 rounded-lg"
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
