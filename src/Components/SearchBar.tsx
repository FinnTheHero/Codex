import React, { useCallback, useState } from "react";
import { Novel, SearchBarProps } from "../Types/types";

import "../Styles/ComponentStyles.css";
import { useContent } from "../Contexts/ContentContext";
import useSWR from "swr";

const SearchBar = () => {
    const [input, setInput] = useState("");

    const { setNovel, setNovels } = useContent();
    const { data, error } = useSWR<any>(`/all`);

    // TODO: Add some level of security!
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleNovelSearch = useCallback(
        (novelTitle: string) => {
            setNovels([]);
            setNovel(data.novel || null);
        },
        [setNovels, setNovel],
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleNovelSearch(input);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-row flex-nowrap justify-between border-b border-zinc-800 mb-6"
        >
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Search . . ."
                className="search-input w-full"
            />

            <button className="search-button" type="submit">
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        viewBox="0 0 26 26"
                    >
                        <path
                            fill="#94e2d5"
                            d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
                        ></path>
                    </svg>
                </span>
            </button>
        </form>
    );
};

export default SearchBar;
