import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";
import AuthPopover from "./AuthPopover";

const Navbar = () => {
    const { user } = useUser();

    const [dropdown, setDropdown] = useState<boolean>(false);

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
                        <Link to="/" className="text-2xl font-bold">
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
                            className={`visible sm:hidden`}
                        >
                            <FontAwesomeIcon size="xl" icon={faBars} />
                        </button>
                        <div className="hidden sm:flex items-center justify-between space-x-5">
                            {user && (
                                <Link to="/dashboard/upload" className="link">
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
                            <AuthPopover>
                                {user ? (
                                    <div className="text-lg content cursor-pointer">
                                        [{user.username}]
                                    </div>
                                ) : (
                                    <div className="text-lg content cursor-pointer">
                                        [User]
                                    </div>
                                )}
                            </AuthPopover>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <div
                        className={`${dropdown ? "w-fit flex flex-col flex-nowrap items-end pb-4 pt-2 px-2 pl-6 border-t border-zinc-800" : "hidden"}`}
                    >
                        <Link to="/novels" className="link">
                            [Novels]
                        </Link>
                        {user && user.type === "Admin" && (
                            <Link to="/dashboard" className="link">
                                [Dashboard]
                            </Link>
                        )}
                        <AuthPopover>
                            {user ? (
                                <div className="text-lg content cursor-pointer">
                                    [{user.username}]
                                </div>
                            ) : (
                                <div className="text-lg content cursor-pointer">
                                    [User]
                                </div>
                            )}
                        </AuthPopover>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
