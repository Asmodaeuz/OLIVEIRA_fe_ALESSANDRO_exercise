import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import * as API from 'api';
import TeamOverview from 'pages/TeamOverview';
import {TeamOverview as TeamInfo, UserData} from 'types';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            name: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render team overview users', async () => {
        const teamOverview: TeamInfo = {
            id: '1',
            teamLeadId: '1',
            teamMemberIds: ['2', '3', '4'],
        };

        const teamLeadUserData: UserData = {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            displayName: 'JohnDoe',
            location: '',
            avatar: '',
        };

        const teamMemberUserData: UserData[] = [
            {
                id: '2',
                firstName: 'Jane',
                lastName: 'Smith',
                displayName: 'JaneSmith',
                location: '',
                avatar: '',
            },
            {
                id: '3',
                firstName: 'Bob',
                lastName: 'Johnson',
                displayName: 'BobJohnson',
                location: '',
                avatar: '',
            },
            {
                id: '4',
                firstName: 'Alice',
                lastName: 'Williams',
                displayName: 'AliceWilliams',
                location: '',
                avatar: '',
            },
        ];

        jest.spyOn(API, 'getTeamOverview').mockResolvedValueOnce(teamOverview);
        jest.spyOn(API, 'getUserData')
            .mockResolvedValueOnce(teamLeadUserData) 
            .mockResolvedValueOnce(teamMemberUserData[0]) 
            .mockResolvedValueOnce(teamMemberUserData[1]) 
            .mockResolvedValueOnce(teamMemberUserData[2]);

        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryByText('John Doe')).toBeInTheDocument(); 
            expect(screen.queryByText('Jane Smith')).toBeInTheDocument(); 
            expect(screen.queryByText('Bob Johnson')).toBeInTheDocument();
            expect(screen.queryByText('Alice Williams')).toBeInTheDocument(); 
        });
    });
});
