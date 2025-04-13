import { Link } from "react-router-dom";
import Popover from "./Popover";

const Footer = () => {
    return (
        <div className="max-h-16 border-t border-zinc-800 mt-16 flex flex-row flex-wrap justify-center">
            <div className="max-w-6xl px-8 w-full my-4">
                <div className="flex items-center justify-between">
                    <p className="ml-2 text-center">&copy; 2024 - Codex</p>
                    <Popover text="Read more about Codex">
                        <Link className="link" to={"/about"}>
                            [About]
                        </Link>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default Footer;
