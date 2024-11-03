import { Link } from "react-router-dom";

const GoBackButton = ({ to, className }: { to: string; className: string }) => {
    return (
        <Link to={to} className={className}>
            [Go Back]
        </Link>
    );
};

export default GoBackButton;
