import React from 'react';
import {render, screen} from '@testing-library/react';
import List from '..';

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => jest.fn(),
}));

const item = [
    {
        id: '1',
        dataRows: [
            {
                key: 'columnKey1',
                value: 'columnValue1',
            },
        ],
        navigationProps: {
            id: '1',
            name: 'John Doe',
        },
    },
];

describe('List', () => {
    it('should render spinner and not render items when it is loading', () => {
        render(<List isLoading items={item} />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        expect(screen.queryByTestId('cardContainer')).not.toBeInTheDocument();
    });

    it('should not render spinner and render items when it is not loading', () => {
        render(<List isLoading={false} items={item} />);

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
    });

    it('should render multiple card when multiple items', () => {
        const itemsList = [
            ...item,
            {
                id: '2',
                dataRows: [
                    {
                        key: 'columnKey2',
                        value: 'columnValue2',
                    },
                ],
            },
        ];
        render(<List isLoading={false} items={itemsList} />);

        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-2')).toBeInTheDocument();
    });
});
