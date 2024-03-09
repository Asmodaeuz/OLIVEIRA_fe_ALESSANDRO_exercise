import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import Card from 'components/Card';
import {Container} from 'components/GlobalComponents';
import Header from 'components/Header';
import List from 'components/List';
import {useUserSearch} from 'hooks/useSearch';
import {useDataMapper} from 'hooks/useDataMapper';

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const {teamLead, teamMembers, isLoading, filteredItems, setSearchQuery} = useUserSearch(teamId);
    
    const {mapUserInfo} = useDataMapper();
    const teamLeadInfo = mapUserInfo(teamLead, 'lead');
    const list = filteredItems.length ? filteredItems : teamMembers;
    const teamMemberInfo = list?.filter(member => member.id !== teamLead.id).map(member => mapUserInfo(member, 'member'));
    const isTeamLeadInFilteredUsers = !isLoading && teamLead && (filteredItems.length === 0 || filteredItems.includes(teamLead));
    
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <Container className="margin-reset">
            <Header title={`Team ${location.state.name}`} handleSearch={handleSearch} isLoading={isLoading} />
            {isTeamLeadInFilteredUsers && 
                <Card 
                    id={teamLeadInfo.id}
                    dataRows={teamLeadInfo.dataRows || []}
                    url={`/user/${teamLeadInfo.id}`}
                    navigationProps={teamLeadInfo.navigationProps}
                />
            }
            <List
                items={teamMemberInfo}
                isLoading={isLoading}
            />
        </Container>
    );
};

export default TeamOverview;
