import { useState } from "react";
import { Link } from "react-router-dom";
import { Popover } from "react-tiny-popover";

const GoBackButton = ({
    to,
    className,
    desc,
}: {
    to: string;
    className: string;
    desc: string;
}) => {
    const [isBackPopoverOpen, setIsBackPopoverOpen] = useState(false);

    return (
        <Popover
            isOpen={isBackPopoverOpen && desc !== ""}
            positions={["bottom", "left", "top", "right"]}
            padding={10}
            reposition={true}
            boundaryInset={document.body.scrollHeight}
            onClickOutside={() => setIsBackPopoverOpen(false)}
            content={
                <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded text-lg">
                    [{desc}]
                </div>
            }
        >
            <Link
                to={to}
                className={className}
                onMouseEnter={() => setIsBackPopoverOpen(true)}
                onMouseLeave={() => setIsBackPopoverOpen(false)}
            >
                [Go Back]
            </Link>
        </Popover>
    );
};

export default GoBackButton;
