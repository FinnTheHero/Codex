export interface NovelDTO {
    Title: string;
    Author: string;
    Novel: Novel;
}

export interface NovelCardProps {
    novel: Novel;
    setNovel: (setNovel: Novel | null) => void;
    setChapters: (setChapters: Chapter[]) => void;
    // TODO: Probably need a better way to handle this case!
}

export interface Novel {
    title: string;
    author: string;
    description: string;
    creation_date: string;
    upload_date: string;
    update_date: string;
}

export interface Chapter {
    title: string;
    author: string;
    description: string;
    creation_date: string;
    upload_date: string;
    update_date: string;
    content: string;
}

export interface ChapterCardProps {
    chapter: Chapter;
    novel: Novel;
}

export interface ChapterDTO {}

export interface SearchBarProps {
    setNovel: (novel: Novel | null) => void;
    setNovels: React.Dispatch<React.SetStateAction<Novel[]>>;
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
    setUser: (user: User | null) => void;
    logout: () => void;
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

export interface SearchChapterHandlerProps {
    title_novel: string;
    title_chapter: string;
    setChapter?: (chapter: Chapter) => void;
    setChapters?: (chapters: Chapter[]) => void;
}

export interface SearchNovelHandlerProps {
    title_novel: string;
    setNovel?: (novel: Novel) => void;
    setNovels?: (novel: Novel[]) => void;
}
