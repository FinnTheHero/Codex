import { useState } from "react";
import formatDate from "../Services/formatDate";
import { Popover } from "react-tiny-popover";

const FormattedTime = ({
    date,
    classname,
    popover_text,
}: {
    date: string;
    classname: string;
    popover_text: string;
}) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    let time = formatDate(date);

    return (
        <div>
            <Popover
                isOpen={isPopoverOpen}
                positions={["bottom", "left"]}
                padding={10}
                onClickOutside={() => setIsPopoverOpen(false)}
                content={
                    <div className="link main-background whitespace-nowrap p-2 border border-zinc-800 rounded">
                        {popover_text}
                    </div>
                }
            >
                <div
                    onMouseEnter={() => setIsPopoverOpen(true)}
                    onMouseLeave={() => setIsPopoverOpen(false)}
                    className={classname}
                >
                    {time}
                </div>
            </Popover>
        </div>
    );
};

export default FormattedTime;
