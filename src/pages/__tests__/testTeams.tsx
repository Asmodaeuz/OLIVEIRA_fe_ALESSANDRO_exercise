import * as React from 'react';
import {fireEvent, render, screen, waitFor, act} from '@testing-library/react';
import * as API from 'api';
import Teams from 'pages/Teams';
import List from 'components/List';
import { Teams as TeamsList } from 'types';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

const MOCK_TEAMS: TeamsList[] = [
    {
        id: '1',
        name: 'Team1',
    },
    {
        id: '2',
        name: 'Team2',
    },
    {
        id: '3',
        name: 'Team3',
    },
];

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', () => {
        render(<Teams />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        expect(screen.queryByTestId('cardContainer')).not.toBeInTheDocument();
    });

    it('should not render spinner after loading', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue(MOCK_TEAMS);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
            expect(screen.getByText('Team1')).toBeInTheDocument();
            expect(screen.getByText('Team2')).toBeInTheDocument();
            expect(screen.getByText('Team3')).toBeInTheDocument();
        });
    });

    it('should render teams list', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue(MOCK_TEAMS);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
            expect(screen.getByText('Team2')).toBeInTheDocument();
            expect(screen.getByText('Team3')).toBeInTheDocument();
        });
    });
});
