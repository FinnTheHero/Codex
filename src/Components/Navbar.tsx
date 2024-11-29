import { Link } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";
import AuthPopover from "./AuthPopover";

const Navbar = () => {
    const { user } = useUser();

    return (
        <div className="border-b border-zinc-800 mb-16 flex justify-center">
            <div className="max-w-7xl px-4 w-full">
                <div className="flex justify-between">
                    <div className="my-4 mx-2">
                        <Link to="/" className="text-2xl font-bold">
                            [Codex]
                        </Link>
                    </div>
                    <div className="flex items-center justify-between space-x-5 py-4 px-2">
                        <Link to="/novels" className="link">
                            [Novels]
                        </Link>
                        {user && user.type === "admin" && (
                            <Link to="/admin" className="link">
                                [Dashboard]
                            </Link>
                        )}
                        <AuthPopover>
                            {user ? (
                                <div className="text-lg content cursor-pointer">
                                    [{user.username}]
                                </div>
                            ) : (
                                <div className="text-lg content cursor-pointer">
                                    [User]
                                </div>
                            )}
                        </AuthPopover>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
