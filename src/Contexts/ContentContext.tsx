import { createContext, ReactNode, useContext, useState } from "react";
import { Chapter, ContentContextType, Novel } from "../Types/types";
import { useError } from "./ErrorContext";
import { useLoading } from "./LoadingContext";
import { useNotification } from "./NotificationContext";

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { addError } = useError();
    const { setLoading } = useLoading();
    const { setNotification } = useNotification();

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [novels, setNovels] = useState<Novel[]>([]);

    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [novel, setNovel] = useState<Novel | null>(null);

    return (
        <ContentContext.Provider
            value={{
                chapter,
                setChapter,
                chapters,
                setChapters,
                novels,
                setNovels,
                novel,
                setNovel,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
};
export const useContent = (): ContentContextType => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error("useContent must be used within a ContentProvider!");
    }
    return context;
};
