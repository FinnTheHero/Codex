import { useState } from "react";
import { Link } from "react-router-dom";
import { Popover } from "react-tiny-popover";

const Footer = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <div className="max-h-16 border-t border-zinc-800 mt-16 flex flex-row flex-wrap justify-center">
            <div className="max-w-6xl px-8 w-full my-4">
                <div className="flex items-center justify-between">
                    <p className="ml-2 text-center">&copy; 2024 - Codex</p>
                    <Popover
                        isOpen={isPopoverOpen}
                        positions={["bottom", "left"]}
                        padding={10}
                        onClickOutside={() => setIsPopoverOpen(false)}
                        content={
                            <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                                Read more about Codex
                            </div>
                        }
                    >
                        <Link
                            onMouseEnter={() => setIsPopoverOpen(true)}
                            onMouseLeave={() => setIsPopoverOpen(false)}
                            className="link"
                            to={"/about"}
                        >
                            [About]
                        </Link>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default Footer;
