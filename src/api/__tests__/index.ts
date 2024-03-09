import {getTeams, getTeamOverview, getUserData} from 'api';
import {Teams, TeamOverview, UserData} from 'types';

const MOCK_TEAMS: Teams[] = [
    {id: '1', name: 'Team 1'},
    {id: '2', name: 'Team 2'},
    {id: '3', name: 'Team 3'},
];

const MOCK_TEAM_OVERVIEW: TeamOverview = {
    id: '1',
    teamLeadId: '1',
    teamMemberIds: ['2', '3'],
};

const MOCK_USER_DATA: UserData = {
    id: '1',
    firstName: 'Jhon',
    lastName: 'Doe',
    displayName: 'Jhon Doe',
    location: 'Somewhere',
    avatar: 'fake_avatar.png',
};

describe('API fetch functions', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const mockResponse = data => {
        return Promise.resolve({
            json: () => Promise.resolve(data),
        });
    };

    it('should fetch teams data', async () => {
        (global.fetch as jest.Mock).mockImplementation(() => mockResponse(MOCK_TEAMS));

        const teams = await getTeams();

        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/teams`);
        expect(teams).toEqual(MOCK_TEAMS);
    });

    it('should fetch team overview data', async () => {
        const teamId = '1';

        (global.fetch as jest.Mock).mockImplementation(() => mockResponse(MOCK_TEAM_OVERVIEW));

        const teamOverview = await getTeamOverview(teamId);

        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/teams/${teamId}`);
        expect(teamOverview).toEqual(MOCK_TEAM_OVERVIEW);
    });

    it('should fetch user data', async () => {
        const userId = '1';

        (global.fetch as jest.Mock).mockImplementation(() => mockResponse(MOCK_USER_DATA));

        const userData = await getUserData(userId);

        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`);
        expect(userData).toEqual(MOCK_USER_DATA);
    });
});
