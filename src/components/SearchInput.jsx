import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const SearchInput = ({ placeholder, className, onChange, onSearch, value }) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value); // Update inputValue when value prop changes
    }, [value]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        onChange && onChange(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch && onSearch(inputValue);
        }
    };

    return (
        <div
            className={`relative flex items-center border border-black rounded-full ${className}`}
        >
            <input
                type='text'
                placeholder={placeholder}
                className='flex-grow px-3 py-2 outline-none'
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button
                className='absolute right-0 top-0 bottom-0 px-2 flex items-center justify-center bg-blue-700 text-white rounded-r-full'
                onClick={() => onSearch && onSearch(inputValue)}
            >
                <MagnifyingGlassIcon className='h-5 w-5' />
            </button>
        </div>
    );
};

export default SearchInput;
