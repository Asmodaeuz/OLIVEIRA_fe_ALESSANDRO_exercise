import * as React from 'react';
import {SearchContainer, SearchForm, SearchInput, SearchSubmitButton} from './styles';

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading?: boolean;
    showSearchBar: boolean;
}

const SearchBar = ({onSearch, isLoading, showSearchBar = false}: SearchBarProps): JSX.Element => {
    const [query, setQuery] = React.useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if(query === null) {
            onSearch('');
        }
        onSearch(query);
    };

    return (
        <SearchContainer data-testid='search-bar' showSearchBar={showSearchBar}>
            <SearchForm onSubmit={handleSubmit}>
                <SearchInput
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleChange}
                />
                <SearchSubmitButton type="submit" disabled={isLoading}>
                    Search
                </SearchSubmitButton>
            </SearchForm>
        </SearchContainer>
    );
};

export default SearchBar;
