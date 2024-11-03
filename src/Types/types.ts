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
    setError: (value: string | null) => void;
    setLoading: (value: boolean) => void;
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
    onSearch: (searchTerm1: string, searchTerm2: string) => void;
}

export interface PopoverProps {
    text: string;
    children: React.ReactNode;
}
