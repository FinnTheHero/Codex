import { Link, useNavigate } from "react-router-dom";
import { NovelCardProps } from "../Types/types";
import { useContent } from "../Contexts/ContentContext";
import { useEffect, useRef, useState } from "react";

const NovelCard: React.FC<NovelCardProps> = ({ novel, index }) => {
    const [progress, setProgress] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const startTimeRef = useRef<number>(0);
    const animationFrameRef = useRef<number>(0);
    const timeoutRef = useRef<any>(0);
    const { novels, setNovel } = useContent();
    const HOLD_DURATION = 1500;
    const CLICK_DURATION = 500;
    const navigate = useNavigate();

    const updateProgress = (
        targetDuration: number,
        isClick: boolean = false,
    ) => {
        if (startTimeRef.current) {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = Math.min((elapsed / targetDuration) * 100, 100);
            setProgress(newProgress);

            if (elapsed < targetDuration) {
                animationFrameRef.current = requestAnimationFrame(() =>
                    updateProgress(targetDuration, isClick),
                );
            } else if (isClick) {
                // Click animation complete - set novel AND navigate
                setNovel(novel);
                navigate(`/novels/${novel.id}#codex`);
            } else {
                // Hover animation complete - only set novel
                setNovel(novel);
            }
        }
    };

    const handleClick = () => {
        const currentProgress = progress;
        const remainingProgress = 100 - currentProgress;

        setIsAnimating(true);
        setIsHovering(false);

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (currentProgress >= (CLICK_DURATION / HOLD_DURATION) * 100) {
            // Already past click threshold, finish quickly
            const remainingTime = (remainingProgress / 100) * CLICK_DURATION;
            startTimeRef.current =
                Date.now() - (CLICK_DURATION - remainingTime);
            animationFrameRef.current = requestAnimationFrame(() =>
                updateProgress(CLICK_DURATION, true),
            );
        } else {
            // Blend into click animation from current progress
            const elapsedTime = (currentProgress / 100) * CLICK_DURATION;
            startTimeRef.current = Date.now() - elapsedTime;
            animationFrameRef.current = requestAnimationFrame(() =>
                updateProgress(CLICK_DURATION, true),
            );
        }
    };

    const handleMouseEnter = () => {
        if (isAnimating) return;

        setIsHovering(true);
        startTimeRef.current = Date.now();

        animationFrameRef.current = requestAnimationFrame(() =>
            updateProgress(HOLD_DURATION, false),
        );

        timeoutRef.current = setTimeout(() => {
            setNovel(novel);
        }, HOLD_DURATION);
    };

    const handleMouseLeave = () => {
        if (isAnimating) return;

        setIsHovering(false);
        setProgress(0);
        startTimeRef.current = 0;

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const currentProgress = progress;
        const decreaseStartTime = Date.now();

        const animateDecrease = () => {
            const elapsed = Date.now() - decreaseStartTime;
            const newProgress = Math.max(
                currentProgress - (elapsed / CLICK_DURATION) * 100,
                0,
            );
            setProgress(newProgress);

            if (newProgress > 0) {
                animationFrameRef.current =
                    requestAnimationFrame(animateDecrease);
            } else {
                startTimeRef.current = 0;
            }
        };

        animationFrameRef.current = requestAnimationFrame(animateDecrease);
    };

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="relative flex flex-col gap-6 p-2.5 my-2 overflow-x-clip"
        >
            {novel && (
                <div>
                    <h1 className="text-2xl text-nowrap overflow-hidden overflow-ellipsis">
                        {novel.title}
                    </h1>
                    <div className="mx-1 mt-1 flex justify-between">
                        <div className="subtitle">
                            {" > "} {novel.author}
                        </div>
                        <div
                            onClick={() => {
                                handleClick();
                            }}
                            className="mx-1 link cursor-pointer"
                        >
                            [Read]
                        </div>
                    </div>
                </div>
            )}

            <div
                className="absolute inset-0 bg-gradient-to-r from-[#fab387]/15 to-[#fab387]/50 pointer-events-none rounded-xs transition-[width] duration-750 ease-out"
                style={{ width: `${progress}%` }}
            />
            <div className="absolute -bottom-1 left-0.5 right-0.5 h-px bg-zinc-800" />
        </div>
    );
};

export default NovelCard;
