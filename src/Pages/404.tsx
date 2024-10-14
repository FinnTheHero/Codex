import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="text-center text-wrap text-xl px-12">
            <p className="text-2xl">Something went wrong...</p>
            <h1 className="my-4 text-6xl" style={{ color: "red" }}>
                Page Not Found!
            </h1>
            <p className="mb-12">
                Page you are looking for does not exist, has been moved or is
                under construction.
            </p>
            <Link to="/" className="text-3xl link">
                [back to Home]
            </Link>
        </div>
    );
};

export default NotFound;
