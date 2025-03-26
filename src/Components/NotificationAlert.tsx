const NotificationAlert = ({ notification }: { notification: string }) => {
    return (
        <div
            className="custom-alert content flex items-center w-full max-w-fit p-4 my-2 rounded-lg"
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
