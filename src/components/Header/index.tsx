import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import SearchBar from 'components/Searchbar';
import {HeaderContainer, NavigationHeader, BackButton, BackButtonIcon, Title, SearchBarButton, SearchBarIcon} from './styles';

interface HeaderProps {
    title: string;
    isLoading?: boolean;
    hasSearchIcon?: boolean;
    showBackButton?: boolean;
    handleSearch?: (query: string) => void;
}

const Header = ({
    title,
    isLoading,
    handleSearch,
    hasSearchIcon = true,
    showBackButton = true,
}: HeaderProps): JSX.Element => {
    const navigate = useNavigate();
    const [showSearchBar, setShowSearchBar] = React.useState<boolean>(false);

    const goToPreviousPage = () => {
        navigate(-1);
    };

    const toggleSearchBarVisibility = () => {
        setShowSearchBar(!showSearchBar);
    };

    return (
        <React.Fragment>
            <HeaderContainer className="with-search">
                <NavigationHeader>
                    {showBackButton && 
                        <BackButton 
                            data-testid='back-button'
                            onClick={goToPreviousPage} 
                        >
                            <BackButtonIcon 
                                src="/back_arrow.svg"
                                alt="An arrow icon pointed backwards"
                            />
                        </BackButton>
                    }
                    <Title>{title}</Title>
                    {hasSearchIcon &&
                        <SearchBarButton 
                            data-testid='search-icon-button'
                            onClick={toggleSearchBarVisibility}
                        >
                            <SearchBarIcon 
                                src="/search_icon.svg"
                                alt="A magnifying glass icon"
                            />
                        </SearchBarButton>
                    }
                </NavigationHeader>
            </HeaderContainer>
            <SearchBar onSearch={handleSearch} showSearchBar={showSearchBar} isLoading={isLoading} />
        </React.Fragment>
    );
};

export default Header;
