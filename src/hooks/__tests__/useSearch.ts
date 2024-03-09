import { renderHook, act } from '@testing-library/react';
import { useTeamSearch, useUserSearch } from 'hooks/useSearch';
import { getTeams, getTeamOverview, getUserData } from 'api';

jest.mock('api');

describe('useTeamSearch', () => {
    const MOCK_TEAMS = [
        { id: '1', name: 'Team 1' },
        { id: '2', name: 'Team 2' },
        { id: '3', name: 'Team 3' },
    ];

    it('should fetch teams and set loading state to false', async () => {
        (getTeams as jest.Mock).mockResolvedValueOnce(MOCK_TEAMS);

        const { result } = renderHook(() => useTeamSearch());

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 100)); 
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.filteredItems).toEqual(MOCK_TEAMS);
    });

    it('should filter teams based on search query', async () => {
        (getTeams as jest.Mock).mockResolvedValueOnce(MOCK_TEAMS);

        const { result } = renderHook(() => useTeamSearch());

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 100)); 
        });

        act(() => {
            result.current.setSearchQuery('Team 1');
        });

        expect(result.current.filteredItems).toEqual([{ id: '1', name: 'Team 1' }]);
    });
});

describe('useUserSearch', () => {
    const MOCK_TEAM_OVERVIEW = {
        teamLeadId: '1',
        teamMemberIds: ['2', '3'],
    };

    const MOCK_USER_DATA = [
        { id: '1', displayName: 'User 1' },
        { id: '2', displayName: 'User 2' },
        { id: '3', displayName: 'User 3' },
    ];

    it('should fetch team overview and user data and set loading state to false', async () => {
        (getTeamOverview as jest.Mock).mockResolvedValueOnce(MOCK_TEAM_OVERVIEW);
        (getUserData as jest.Mock)
            .mockResolvedValueOnce({ id: '1', displayName: 'Team Lead' })
            .mockResolvedValueOnce({ id: '2', displayName: 'User 2' })
            .mockResolvedValueOnce({ id: '3', displayName: 'User 3' });

        const { result } = renderHook(() => useUserSearch('1'));

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 100)); 
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.teamLead).toEqual({ id: '1', displayName: 'Team Lead' });
        expect(result.current.teamMembers).toEqual([
            { id: '2', displayName: 'User 2' },
            { id: '3', displayName: 'User 3' },
        ]);
    });

    it('should filter users based on search query', async () => {
        (getTeamOverview as jest.Mock).mockResolvedValueOnce(MOCK_TEAM_OVERVIEW);
        (getUserData as jest.Mock)
            .mockResolvedValueOnce({ id: '1', displayName: 'Team Lead' })
            .mockResolvedValueOnce({ id: '2', displayName: 'User 2' })
            .mockResolvedValueOnce({ id: '3', displayName: 'User 3' });

        const { result } = renderHook(() => useUserSearch('1'));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        act(() => {
            result.current.setSearchQuery('User 2');
        });

        expect(result.current.filteredItems).toEqual([{ id: '2', displayName: 'User 2' }]);
    });
});
