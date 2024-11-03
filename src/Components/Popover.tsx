import { useState } from "react";
import { PopoverProps } from "../Types/types";

const Popover: React.FC<PopoverProps> = ({ text, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            {isHovered && (
                <div
                    className={`popover ${isHovered ? "popover-visible" : ""} mb-1 px-1 py-2 border border-zinc-800 rounded`}
                    style={{
                        whiteSpace: "nowrap",
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default Popover;
