import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";
import { AuthPopoverProps } from "../Types/types";

const AuthPopover: React.FC<AuthPopoverProps> = ({ children }) => {
    const { user, logout } = useUser();

    const [isHovered, setIsHovered] = useState(false);
    const [isChildHovered, setIsChildHovered] = useState(false);

    useEffect(() => {
        if (isHovered) {
            let time = 1500;
            if (isChildHovered) {
                time = 999999;
            }
            const timer = setTimeout(() => {
                setIsHovered(false);
            }, time);

            return () => clearTimeout(timer);
        }
    }, [isHovered, isChildHovered]);

    return (
        <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setIsHovered(true)}
            onClick={() => setIsHovered(true)}
        >
            {children}
            {isHovered && (
                <div
                    className={`text-lg content popover-bottom flex flex-row flex-wrap text-center ${isHovered ? "popover-visible" : ""} mb-1 px-1 py-2 border border-zinc-800 rounded`}
                    style={{
                        whiteSpace: "nowrap",
                    }}
                    onMouseEnter={() => setIsChildHovered(true)}
                    onMouseLeave={() => setIsChildHovered(false)}
                >
                    {user ? (
                        <div
                            className="text-red-700 cursor-pointer"
                            onClick={logout}
                        >
                            [Logout]
                        </div>
                    ) : (
                        <div className="flex flex-col flex-nowrap">
                            <Link className="mx-auto mb-1" to={"/login"}>
                                [Login]
                            </Link>
                            <Link to={"/register"}>[Register]</Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AuthPopover;
