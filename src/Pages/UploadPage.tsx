import { Link } from "react-router-dom";
import GoBackButton from "../Components/GoBackButton";

const UploadPage = () => {
    return (
        <div className="max-w-6xl w-full h-full px-8 lg:px-12 flex flex-col flex-nowrap items-center justify-evenly">
            <div className="w-full h-auto text-2xl flex flex-col md:flex-row flex-wrap justify-evenly items-center">
                <div className="w-auto flex flex-col items-center justify-between">
                    <Link to="/dashboard/upload/novel" className="link">
                        [Upload Novel]
                    </Link>
                    <Link to="/dashboard/upload/chapter" className="link mt-6">
                        [Upload Chapter]
                    </Link>
                </div>
                <p className="content my-12">Or</p>
                <div className="w-auto flex flex-col flex-nowrap items-center justify-evenly">
                    <Link to="/dashboard/upload/epub" className="link">
                        [Pick EPUB file]
                    </Link>
                </div>
            </div>
            <GoBackButton
                className="link mt-24 text-xl"
                to={`/novels`}
                desc={`Novels`}
            />
        </div>
    );
};

export default UploadPage;
