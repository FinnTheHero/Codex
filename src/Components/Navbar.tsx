import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";
import { Popover } from "react-tiny-popover";
import PersistentStoragePermissionButton from "./PersistentStoragePermissionButton";
import SettingsDropdown from "./SettingsDropdown";

const Navbar = () => {
    const { user, logout } = useUser();

    const [dropdown, setDropdown] = useState<boolean>(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) {
                setDropdown(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setDropdown]);

    return (
        <div className="border-b border-zinc-800 mb-16 flex justify-center">
            <div className="max-w-6xl px-4 w-full">
                <div className="flex justify-between ">
                    <div className="my-4 mx-2">
                        <Link id="codex" to="/" className="text-2xl font-bold">
                            [Codex]
                        </Link>
                    </div>

                    <div
                        className={`flex items-center justify-between space-x-5 py-4 px-2`}
                    >
                        <button
                            onClick={() => {
                                setDropdown(!dropdown);
                            }}
                            className={`visible lg:hidden m-2`}
                        >
                            <FontAwesomeIcon size="xl" icon={faBars} />
                        </button>
                        {!dropdown && (
                            <div className="hidden lg:flex items-center justify-between space-x-5">
                                <PersistentStoragePermissionButton />
                                <SettingsDropdown />

                                {user && (
                                    <Link
                                        to="/dashboard/upload"
                                        className="link"
                                    >
                                        [Upload]
                                    </Link>
                                )}

                                {user && user.type === "Admin" && (
                                    <Link to="/dashboard" className="link">
                                        [Dashboard]
                                    </Link>
                                )}

                                <Link to="/novels" className="link">
                                    [Novels]
                                </Link>
                                <Popover
                                    isOpen={isPopoverOpen && !dropdown}
                                    positions={["bottom", "left"]}
                                    padding={10}
                                    onClickOutside={() =>
                                        setIsPopoverOpen(false)
                                    }
                                    content={
                                        <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                                            {user ? (
                                                <div
                                                    className="text-red-700 cursor-pointer"
                                                    onClick={logout}
                                                >
                                                    [Logout]
                                                </div>
                                            ) : (
                                                <div className="flex flex-col flex-nowrap">
                                                    <Link
                                                        className="mx-auto mb-1"
                                                        to={"/login"}
                                                    >
                                                        [Login]
                                                    </Link>
                                                    <Link to={"/register"}>
                                                        [Register]
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    }
                                >
                                    <div
                                        onMouseEnter={() =>
                                            setIsPopoverOpen(true)
                                        }
                                        onMouseLeave={() => {
                                            setTimeout(() => {
                                                setIsPopoverOpen(false);
                                            }, 3000);
                                        }}
                                        className="text-lg content cursor-pointer"
                                    >
                                        {user ? `[${user.username}]` : "[User]"}
                                    </div>
                                </Popover>
                            </div>
                        )}
                    </div>
                </div>
                {dropdown && (
                    <div className="w-full flex justify-end">
                        <div
                            className={`${dropdown ? "text-xl w-fit flex flex-col flex-nowrap items-end pb-4 pt-2 px-2 pl-6 border-t border-zinc-800" : "hidden"}`}
                        >
                            <PersistentStoragePermissionButton />
                            <SettingsDropdown />
                            <Link to="/novels" className="link">
                                [Novels]
                            </Link>
                            {user && user.type === "Admin" && (
                                <Link to="/dashboard" className="link">
                                    [Dashboard]
                                </Link>
                            )}
                            <Popover
                                isOpen={isPopoverOpen && dropdown}
                                positions={["bottom", "left"]}
                                padding={10}
                                onClickOutside={() => setIsPopoverOpen(false)}
                                content={
                                    <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                                        {user ? (
                                            <div
                                                className="text-red-700 cursor-pointer"
                                                onClick={logout}
                                            >
                                                [Logout]
                                            </div>
                                        ) : (
                                            <div className="flex flex-col flex-nowrap">
                                                <Link
                                                    className="mx-auto mb-1"
                                                    to={"/login"}
                                                >
                                                    [Login]
                                                </Link>
                                                <Link to={"/register"}>
                                                    [Register]
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                }
                            >
                                <div
                                    onMouseEnter={() => setIsPopoverOpen(true)}
                                    onMouseLeave={() => {
                                        setTimeout(() => {
                                            setIsPopoverOpen(false);
                                        }, 3000);
                                    }}
                                    className="text-lg content cursor-pointer"
                                >
                                    {user ? `[${user.username}]` : "[User]"}
                                </div>
                            </Popover>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
