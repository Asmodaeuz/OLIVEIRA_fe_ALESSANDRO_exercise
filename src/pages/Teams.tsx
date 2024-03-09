import * as React from 'react';
import Header from 'components/Header';
import List from 'components/List';
import {Container} from 'components/GlobalComponents';
import {useTeamSearch} from 'hooks/useSearch';
import {useDataMapper} from 'hooks/useDataMapper';
import {Spinner} from 'components/Spinner';

const Teams = () => {
    const {isLoading, filteredItems, setSearchQuery} = useTeamSearch();
    const {mapTeamInfo} = useDataMapper();
    const teams = filteredItems ? filteredItems.map(team => mapTeamInfo(team)) : [];

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <Container className="margin-reset">
            {isLoading && <Spinner />}
            {!isLoading && (
                <React.Fragment>
                    <Header
                        title="Teams"
                        showBackButton={false}
                        handleSearch={handleSearch}
                        isLoading={isLoading}
                    />
                    <List items={teams} isLoading={isLoading} standardSize />
                </React.Fragment>
            )}
        </Container>
    );
};

export default Teams;
