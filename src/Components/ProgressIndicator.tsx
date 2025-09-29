import { useEffect, useState } from "react";

const ProgressIndicator = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            var winScroll =
                document.body.scrollTop || document.documentElement.scrollTop;
            var height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            setScrollPosition(scrolled);
        });
    }, []);

    return (
        <div className="fixed top-0 w-full flex flex-row justify-center items-center">
            <div className="w-full h-[1px] overflow-hidden">
                <div
                    className="h-full bg-[#fab387]"
                    style={{ width: `${scrollPosition}%` }}
                />
            </div>
            {/*{Math.round(scrollPosition)}*/}
        </div>
    );
};

export default ProgressIndicator;
