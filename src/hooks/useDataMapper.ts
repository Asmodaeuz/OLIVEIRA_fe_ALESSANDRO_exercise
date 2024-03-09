import {useState, useEffect} from 'react';
import {UserData, Teams as TeamsList, ListItem, TeamInfoState} from 'types';
import {getTeamOverview, getUserData, getTeams} from 'api';

export const useDataMapper = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
    }, []);

    const mapUserInfo = (user: UserData | undefined, role?: 'lead' | 'member'): ListItem => {
        if (!user) {
            return {id: '', dataRows: [], navigationProps: undefined};
        }
        const dataRows = [
            role === 'lead' ? {
                key: 'Team Lead',
                value: '',
            } : {
                key: '',
                value: '',
            },
            {
                key: 'Name',
                value: `${user.firstName} ${user.lastName}`,
            },
            {
                key: 'Display Name',
                value: user.displayName,
            },
            {
                key: 'Location',
                value: user.location,
            },
        ];
        return {
            id: user.id,
            url: `/user/${user.id}`,
            dataRows,
            navigationProps: user,
        };
    };

    const mapTeamInfo = (team: TeamsList): ListItem => {
        const dataRows = [
            {
                key: 'Name:',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            dataRows,
            navigationProps: team,
        };
    };

    const fetchData = async (teamId?: string): Promise<TeamInfoState | TeamsList[]> => {
        if (teamId) {
            try {
                const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
                const teamLead = await getUserData(teamLeadId);
                const teamMembers = await Promise.all(teamMemberIds.map(id => getUserData(id)));
                setIsLoading(false);
                return {teamLead, teamMembers};
            } catch (error) {
                setIsLoading(false);
                throw new Error('Error fetching team users:', error);
            }
        } else {
            try {
                const response = await getTeams();
                setIsLoading(false);
                return response;
            } catch (error) {
                setIsLoading(false);
                throw new Error('Error fetching teams:', error);
            }
        }
    };

    return {isLoading, fetchData, mapUserInfo, mapTeamInfo};
};
