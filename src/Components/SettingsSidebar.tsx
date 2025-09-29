import { Popover } from "react-tiny-popover";
import { useUser } from "../Contexts/UserContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const SettingsSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFontOptionsOpen, setIsFontOptionsOpen] = useState(false);
    const [isPaddingOptionsOpen, setIsPaddingOptionsOpen] = useState(false);

    const {
        user,
        colorScheme,
        setColorScheme,
        fontSize,
        setFontSize,
        sortBy,
        setSortBy,
        padding,
        setPadding,
    } = useUser();

    return (
        <Popover
            isOpen={isOpen}
            positions={["left", "bottom"]}
            padding={10}
            content={
                <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                    <div className="text-lg link flex flex-col flex-nowrap items-center justify-evenly">
                        <Popover
                            isOpen={isFontOptionsOpen}
                            positions={["left", "bottom"]}
                            padding={10}
                            onClickOutside={() => setIsFontOptionsOpen(false)}
                            content={
                                <div className="mx-5 mt-10 link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                                    <div className="text-lg link flex flex-col flex-nowrap items-center justify-evenly">
                                        <span
                                            onClick={() => setFontSize("xs")}
                                            className="cursor-pointer mb-2"
                                        >
                                            [Extra Small]
                                        </span>
                                        <span
                                            onClick={() => setFontSize("sm")}
                                            className="cursor-pointer mb-2"
                                        >
                                            [Small]
                                        </span>
                                        <span
                                            onClick={() => setFontSize("md")}
                                            className="cursor-pointer mb-2"
                                        >
                                            [Medium]
                                        </span>
                                        <span
                                            onClick={() => setFontSize("lg")}
                                            className="cursor-pointer mb-2"
                                        >
                                            [Large]
                                        </span>
                                        <span
                                            onClick={() => setFontSize("xl")}
                                            className="cursor-pointer"
                                        >
                                            [Extra Large]
                                        </span>
                                    </div>
                                </div>
                            }
                        >
                            <p
                                className="cursor-pointer mb-2 mx-2"
                                onClick={() =>
                                    setIsFontOptionsOpen(!isFontOptionsOpen)
                                }
                            >
                                [Font Size]
                            </p>
                        </Popover>
                        <Popover
                            isOpen={isPaddingOptionsOpen}
                            positions={["left", "bottom"]}
                            onClickOutside={() =>
                                setIsPaddingOptionsOpen(false)
                            }
                            content={
                                <div className="mx-10 mt-5 sm:mt-[-35px] link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                                    <div className="link flex flex-col flex-nowrap items-center justify-evenly">
                                        <input
                                            type="range"
                                            min={50}
                                            max={100}
                                            step={5}
                                            value={parseInt(padding)}
                                            onChange={(e) => {
                                                setPadding(
                                                    String(
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    ),
                                                );
                                            }}
                                            style={{ direction: "rtl" }}
                                        />
                                        <span className="my-1">
                                            {100 - parseInt(padding)}
                                        </span>
                                        <div className="w-full flex justify-evenly text-xs main">
                                            {Array.from(
                                                { length: 11 },
                                                (_, i) => (
                                                    <span
                                                        key={i}
                                                        className="mx-2"
                                                    >
                                                        {i * 5}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            <p
                                className="cursor-pointer"
                                onClick={() =>
                                    setIsPaddingOptionsOpen(
                                        !isPaddingOptionsOpen,
                                    )
                                }
                            >
                                [Padding]
                            </p>
                        </Popover>
                    </div>
                </div>
            }
        >
            <div
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                className="fixed top-1/2 right-1 rotate-90 cursor-pointer link flex items-center text-lg"
            >
                [
                <FontAwesomeIcon
                    icon={faGear}
                    className="mx-1 animate-spin"
                    style={{ animationDuration: "5s" }}
                />
                ]
            </div>
        </Popover>
    );
};

export default SettingsSidebar;
