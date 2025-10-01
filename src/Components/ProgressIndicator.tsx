import { Query } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getChapterProgress,
    saveChapterProgress,
} from "../Services/cacheService";
import { useContent } from "../Contexts/ContentContext";
import { useError } from "../Contexts/ErrorContext";
import { throttle } from "lodash";
import { ChapterProgress } from "../Types/types";

const ProgressIndicator = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const lastSavedProgressRef = useRef(0);

    const { id_chapter } = useParams();

    const { chapter } = useContent();
    const { addError } = useError();

    const progress = useMemo(() => {
        return getChapterProgress(String(id_chapter ?? chapter?.id ?? ""));
    }, [id_chapter, chapter?.id]);

    const calculateScrollPercentage = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        return height > 0 ? (winScroll / height) * 100 : 0;
    };

    const saveProgress = useCallback(() => {
        const scrolled = calculateScrollPercentage();
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        if (
            scrolled > lastSavedProgressRef.current ||
            lastSavedProgressRef.current === 0
        ) {
            saveChapterProgress(
                String(id_chapter ?? chapter?.id ?? ""),
                scrolled,
                winScroll,
            );
            lastSavedProgressRef.current = scrolled;
        }
    }, [id_chapter, chapter?.id]);

    const throttledSave = useMemo(
        () => throttle(saveProgress, 1000, { leading: false, trailing: true }),
        [saveProgress],
    );

    useEffect(() => {
        const saved = getChapterProgress(
            String(id_chapter ?? chapter?.id ?? ""),
        );

        if (saved && saved.scrollPosition) {
            if (document.readyState === "complete") {
                window.scrollTo({
                    top: saved.scrollPosition,
                    behavior: "smooth",
                });
            } else {
                window.addEventListener("load", () => {
                    window.scrollTo({
                        top: saved.scrollPosition,
                        behavior: "smooth",
                    });
                });
            }
        }

        const handleScroll = () => {
            setScrollPosition(calculateScrollPercentage());
            throttledSave();
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            throttledSave.cancel();
            saveProgress();
        };
    }, [id_chapter, chapter?.id]);

    return (
        <div className="fixed top-0 w-full flex flex-row justify-center items-center">
            <div className="w-full h-[1px] overflow-hidden">
                <div
                    className="h-full bg-[#fab387]"
                    style={{ width: `${scrollPosition}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressIndicator;
