import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {Teams, UserData} from 'types';
import {Container} from './styles';

interface CardProps {
    id?: string;
    url?: string;
    dataRows: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: UserData | Teams;
    standardSize?: boolean;
}

const Card = ({
    id,
    dataRows,
    url,
    standardSize,
    hasNavigation = true,
    navigationProps = null,
}: CardProps): JSX.Element => {
    const navigate = useNavigate();

    const redirect = (e: React.MouseEvent) => {
        if (hasNavigation) {
            navigate(url, {state: navigationProps});
        }
        e.preventDefault();
    };

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            standardSize={standardSize}
            onClick={redirect}
        >
            {dataRows.map(({key: columnKey, value}) => (
                <p key={columnKey}>
                    <strong>{columnKey}</strong>&nbsp;{value}
                </p>
            ))}
        </Container>
    );
};

export default Card;
