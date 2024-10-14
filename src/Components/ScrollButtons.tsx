import { useState, useEffect } from "react";

const ScrollButtons = () => {
    const [scrollToTopButton, setscrollToTopButton] = useState(false);
    const [scrollToBottomButton, setscrollToBottomButton] = useState(true);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY < 300) {
                setscrollToTopButton(false);
            } else if (window.scrollY > 300) {
                setscrollToTopButton(true);
            }

            if (document.body.scrollHeight - window.scrollY < 1200) {
                setscrollToBottomButton(false);
            } else if (document.body.scrollHeight - window.scrollY > 1200) {
                setscrollToBottomButton(true);
            }
        });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <div>
            {scrollToTopButton && (
                <button
                    className={"scroll-button scroll-to-top"}
                    onClick={scrollToTop}
                >
                    <svg
                        width="28"
                        height="14"
                        viewBox="-7.9 -2 6 10"
                        fill="none"
                        className="inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 1L1 5L5 9"
                            stroke="#fab387"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                    </svg>
                </button>
            )}

            {scrollToBottomButton && (
                <button
                    className={"scroll-button scroll-to-bottom"}
                    onClick={scrollToBottom}
                >
                    <svg
                        width="28"
                        height="14"
                        viewBox="2.3 -8 6 10"
                        fill="none"
                        className="inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 1L1 5L5 9"
                            stroke="#fab387"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ScrollButtons;
