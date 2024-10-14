import formatDate from "../Services/FormatDate";

const FormattedTime = ({ date }: { date: string }) => {
    let time = formatDate(date);

    return <div className="link">{time}</div>;
};

export default FormattedTime;
