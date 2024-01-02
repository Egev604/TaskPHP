import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
interface SearchBarProps {
    onSearch: (query: string) => void;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchQuery, setSearchQuery }) => {
    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
};

export default SearchBar;