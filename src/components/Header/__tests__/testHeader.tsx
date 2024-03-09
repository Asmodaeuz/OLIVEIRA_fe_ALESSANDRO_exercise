import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Header from '..';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Header', () => {
    it('should render header with given title', () => {
        render(<Header title='Header' />);

        expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('should render back button in header if enabled', () => {
        render(<Header title='Header' showBackButton />);

        expect(screen.getByTestId('back-button')).toBeInTheDocument();
    });

    it('should not render back button in header if disabled', () => {
        render(<Header title='Header' showBackButton={false} />);

        expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
    });

    it('should navigate back when back button is clicked', () => {
        render(<Header title='Header' showBackButton />);

        fireEvent.click(screen.getByTestId('back-button'));

        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });

    it('should render search icon button in header if enabled', () => {
        render(<Header title='Header' hasSearchIcon />);

        expect(screen.getByTestId('search-icon-button')).toBeInTheDocument();
    });

    it('should render search icon button in header if disabled', () => {
        render(<Header title='Header' hasSearchIcon={false} />);

        expect(screen.queryByTestId('search-icon-button')).not.toBeInTheDocument();
    });

    it('should toggle search bar visibility when search bar icon is clicked', () => {
        render(<Header title='Header' hasSearchIcon />);
        const searchBar = screen.getByTestId('search-bar')

        expect(searchBar).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('search-icon-button'));
        expect(searchBar).toHaveStyle('visibility: visible')

        fireEvent.click(screen.getByTestId('search-icon-button'));
        expect(searchBar).toHaveStyle('visibility: hidden')
    })
});
