export interface NovelCardProps {
    novel: Novel;
    index: number;
}

export interface Novel {
    id: string;
    title: string;
    author: string;
    description: string;
    creation_date: string;
    upload_date: string;
    update_date: string;
}

export interface Chapter {
    id: string;
    title: string;
    author: string;
    description: string;
    creation_date: string;
    upload_date: string;
    update_date: string;
    content: string;
}

export interface PaginationResponse {
    chapters: Chapter[];
    next_cursor: string;
}

export interface ChapterCardProps {
    chapter: Chapter;
    index: number;
}

export interface SearchInputProps {
    query: string;
    onQueryChange: (newQuery: string) => void;
}

export interface PopoverProps {
    text: string;
    children: React.ReactNode;
}

export interface AuthPopoverProps {
    children: React.ReactNode;
}

export interface RequireAuthProps {
    children: React.ReactNode;
}

export interface LoginProps {
    email: string | null;
    password: string | null;
}

export interface User {
    email: string | null;
    username: string | null;
    type: string | null;
}

export interface UserContextType {
    user: User | null;
    authenticated: boolean;
    setUser: (user: User | null) => void; // This is potentially unsafe
    logout: () => void;
    colorScheme: string;
    setColorScheme: (colorScheme: string) => void;
    fontSize: string;
    setFontSize: (fontSize: string) => void;
    sortBy: "asc" | "desc";
    setSortBy: (sortBy: "asc" | "desc") => void;
}

export interface ContentContextType {
    novel: Novel | null;
    setNovel: (novel: Novel | null) => void;
    novels: Novel[];
    chapter: Chapter | null;
    setChapter: (chapter: Chapter | null) => void;
    chapters: Chapter[];
    refreshAllNovels: () => Promise<void>;
    loadMore: () => void;
    hasMore: boolean;
    setChapterId: (id: string | null) => void;
}

export interface ErrorNotification {
    id: number;
    message: string;
}

export interface ErrorContextType {
    errors: ErrorNotification[];
    addError: (msg: string) => void;
    removeError: (id: number) => void;
}

export interface LoadingContextType {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export interface NotificationContextType {
    notification: string | null;
    setNotification: (notification: string | null) => void;
}

export interface chapterCommon {
    setChapter?: (chapter: Chapter) => void;
    setChapters?: (chapters: Chapter[]) => void;
}

export interface SearchChapterHandlerProps {
    id_novel: string;
    id_chapter: string;
    common: chapterCommon;
}

export interface SearchAllChaptersHandlerProps {
    id_novel: string;
    common: chapterCommon;
}

export interface novelCommon {
    setNovel?: (novel: Novel) => void;
    setNovels?: (novel: Novel[]) => void;
}

export interface SearchNovelHandlerProps {
    id_novel: string;
    common: novelCommon;
}

export interface SearchAllNovelsHandlerProps {
    common: novelCommon;
}
