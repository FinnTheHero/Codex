import { Link } from "react-router-dom";

const UploadPage = () => {
    return (
        <div className="max-w-6xl w-full h-full px-8 lg:px-12 flex flex-row flex-wrap">
            <div className="w-full h-full flex flex-row flex-nowrap justify-center items-center">
                <div className="w-1/2 h-1/3 link text-2xl flex flex-col flex-nowrap text-nowrap items-center text-center justify-evenly px-6 border-r-2 border-zinc-800">
                    <Link to="/upload/novel" className="link">
                        [Upload Novel]
                    </Link>
                    <Link to="/upload/chapter" className="link">
                        [Upload Chapter]
                    </Link>
                </div>
                <div className="h-1/3 flex flex-col flex-nowrap items-center justify-evenly text-center text-2xl ml-6">
                    <p className="content">
                        Upload EPUB file to parse Novel and Chapters directly
                    </p>
                    <Link to="/dashboard/upload/epub" className="link">
                        [Pick EPUB file]
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
