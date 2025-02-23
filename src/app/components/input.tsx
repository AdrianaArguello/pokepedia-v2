'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

type OnSearchType = (query: string) => void;

interface InputProps {
    onSearch: OnSearchType;
}

const Input: React.FC<InputProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };
    
    return (
        <div className="p-4 flex items-center justify-center">
            <div className="relative max-w-[533px] w-[100%]">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                    placeholder="Que pokemon buscas..."
                    value={query}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default Input;