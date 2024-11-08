import formatDate from "../Services/formatDate";
import Popover from "./Popover";

const FormattedTime = ({
    date,
    classname,
    popover_text,
}: {
    date: string;
    classname: string;
    popover_text: string;
}) => {
    let time = formatDate(date);

    return (
        <div>
            <Popover text={popover_text}>
                <div data-popover-target="popover-text" className={classname}>
                    {time}
                </div>
            </Popover>
        </div>
    );
};

export default FormattedTime;
