import { useEffect, useState } from "react";
import { useError } from "../Contexts/ErrorContext";
import { useNotification } from "../Contexts/NotificationContext";
import { Popover } from "react-tiny-popover";

const PersistentStoragePermissionButton = () => {
    const [persistent, setPersistent] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const { addError } = useError();
    const { setNotification } = useNotification();

    const checkPersistence = async () => {
        if (navigator.storage?.persisted) {
            const result = await navigator.storage.persisted();
            setPersistent(result);
        }
    };

    useEffect(() => {
        checkPersistence();
    }, []);

    const requestPersistence = async () => {
        try {
            const granted = await navigator.storage.persist();
            setPersistent(granted);
            setNotification(
                `Persistent storage permission ${granted ? "granted" : "denied"}`,
            );
        } catch (error) {
            addError(
                `Failed to request persistent storage permission: ${(error as Error).message}`,
            );
        }
    };

    return (
        <Popover
            isOpen={isPopoverOpen}
            positions={["bottom", "left"]}
            padding={10}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={
                <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                    Persistent Storage {persistent ? "Enabled" : "Disabled"}
                </div>
            }
        >
            <button
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => setIsPopoverOpen(false)}
                onClick={requestPersistence}
                className={`my-1 ${persistent ? "content" : "link cursor-pointer"}`}
            >
                [Caching]
            </button>
        </Popover>
    );
};

export default PersistentStoragePermissionButton;
