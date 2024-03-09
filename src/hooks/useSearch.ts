import {useState, useEffect} from 'react';
import {getTeamOverview, getUserData, getTeams} from 'api';
import {UserData, Teams as TeamsList, TeamInfoState} from 'types';

interface SearchResult<T> {
    isLoading: boolean;
    filteredItems: T[];
    setSearchQuery: (query: string) => void;
}

interface TeamSearchResult extends SearchResult<UserData> {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

export const useTeamSearch = (): SearchResult<TeamsList> => {
    const [teams, setTeams] = useState<TeamsList[]>([]);
    const [filteredTeams, setFilteredTeams] = useState<TeamsList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTeams();
                setTeams(response);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                throw new Error('Error fetching teams:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!searchQuery) {
            setFilteredTeams(teams);
        }
        const filtered = teams.filter(team => team.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
        setFilteredTeams(filtered);
    }, [searchQuery, teams]);

    return {isLoading, filteredItems: filteredTeams, setSearchQuery};
};

export const useUserSearch = (teamId: string | undefined): TeamSearchResult => {
    const [teamInfo, setTeamInfo] = useState<TeamInfoState>({});
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
                const teamLead = await getUserData(teamLeadId);
                const teamMembers = await Promise.all(teamMemberIds.map(id => getUserData(id)));
                
                setTeamInfo({teamLead, teamMembers});
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                throw new Error('Error fetching team users:', error);
            }
        };

        if (teamId) {
            fetchData();
        }
    }, [teamId]);

    useEffect(() => {
        if (!searchQuery) {
            setFilteredUsers([...(teamInfo.teamMembers ?? []), ...(teamInfo.teamLead ? [teamInfo.teamLead] : [])]);
            return;
        }
    
        const lowercaseQuery = searchQuery.toLowerCase();
        const filtered = (teamInfo.teamMembers?.filter(user =>
            user.displayName.toLowerCase().includes(lowercaseQuery)
        ) ?? []).concat(
            teamInfo.teamLead && teamInfo.teamLead.displayName.toLowerCase().includes(lowercaseQuery)
                ? [teamInfo.teamLead]
                : []
        );
        setFilteredUsers(filtered);
    }, [searchQuery, teamInfo]);

    return {teamLead: teamInfo.teamLead, teamMembers: teamInfo.teamMembers, isLoading, filteredItems: filteredUsers, setSearchQuery};
};

