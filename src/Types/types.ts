export interface NovelDTO {
    Title: string;
    Author: string;
    Novel: Novel;
}

export interface NovelCardProps {
    novel: Novel;
    onHover: (searchTerm1: string, searchTerm2: string) => void;
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

export interface ChapterDTO {}

export interface SearchBarProps {
    onSearch: (searchTerm1: string, searchTerm2: string) => void;
}
