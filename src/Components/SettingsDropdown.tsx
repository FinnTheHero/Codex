import { Popover } from "react-tiny-popover";
import { useUser } from "../Contexts/UserContext";
import { useState } from "react";

const SettingsDropdown = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const {
        user,
        colorScheme,
        setColorScheme,
        fontSize,
        setFontSize,
        sortBy,
        setSortBy,
    } = useUser();

    return (
        <Popover
            isOpen={isPopoverOpen}
            positions={["bottom", "left"]}
            padding={10}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={
                <div
                    onMouseEnter={() => setIsPopoverOpen(true)}
                    onMouseLeave={() => {
                        setTimeout(() => {
                            setIsPopoverOpen(false);
                        }, 3000);
                    }}
                    className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded"
                >
                    {user && (
                        <div className="link flex flex-col flex-nowrap items-center justify-evenly">
                            <p className="cursor-pointer">
                                [Style {colorScheme}]
                            </p>
                            <p className="cursor-pointer my-2">
                                [Font {fontSize}]
                            </p>
                            <p className="cursor-pointer">
                                [Sort{" "}
                                {sortBy === "asc" ? "Ascending" : "Descending"}]
                            </p>
                        </div>
                    )}
                </div>
            }
        >
            <div
                onClick={() => {
                    setIsPopoverOpen(true);
                }}
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => {
                    setTimeout(() => {
                        setIsPopoverOpen(false);
                    }, 15000);
                }}
                className="text-lg link cursor-pointer"
            >
                [Settings]
            </div>
        </Popover>
    );
};

export default SettingsDropdown;
