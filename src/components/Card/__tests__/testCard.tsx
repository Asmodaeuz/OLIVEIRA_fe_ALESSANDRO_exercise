import React from 'react';
import {fireEvent, getByText, render, screen} from '@testing-library/react';
import {UserData, Teams} from 'types';
import Card from '..';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Card', () => {
    it('should render card with the provided dataRows', () => {
        const dataRows = [
            {key: 'columnKey1', value: 'columnValue1'},
            {key: 'columnKey2', value: 'columnValue2'},
            {key: 'columnKey3', value: 'columnValue3'},
        ];
        render(<Card dataRows={dataRows} />);

        expect(screen.getByText('columnKey1')).toBeInTheDocument();
        expect(screen.getByText('columnValue1')).toBeInTheDocument();
        expect(screen.getByText('columnKey2')).toBeInTheDocument();
        expect(screen.getByText('columnValue2')).toBeInTheDocument();
        expect(screen.getByText('columnKey3')).toBeInTheDocument();
    });

    it('should navigate when a team card or a user card is clicked if navigation is enabled', () => {
        const teamNavProps = {
            id: '1',
            name: 'Team 1',
        } as Teams;

        const userNavProps = {
            id: '1',
            firstName: 'User',
            lastName: 'Name',
            displayName: 'UserName',
            location: 'fakelocation',
            avatar: 'fakeavatar',
        } as UserData;

        const teamCard = render(
            <Card
                dataRows={[{key: 'teamKey', value: 'teamName'}]}
                url="path"
                hasNavigation
                navigationProps={teamNavProps}
            />
        );

        const userCard = render(
            <Card
                dataRows={[{key: 'userKey', value: 'userName'}]}
                url="path"
                hasNavigation
                navigationProps={userNavProps}
            />
        );

        fireEvent.click(teamCard.getByText('teamKey'));
        fireEvent.click(userCard.getByText('userKey'));

        expect(mockUseNavigate).toHaveBeenCalledWith('path', {state: teamNavProps});
        expect(mockUseNavigate).toHaveBeenCalledWith('path', {state: userNavProps});
    });

    it('should not navigate when card is clicked and navigation is disabled', () => {
        render(
            <Card dataRows={[{key: 'columnKey', value: 'columnValue'}]} hasNavigation={false} />
        );

        fireEvent.click(screen.getByText('columnKey'));

        expect(mockUseNavigate).not.toHaveBeenCalled();
    });
});
