import * as React from 'react';
import {ListItem} from 'types';
import {Container} from 'components/GlobalComponents';
import Card from 'components/Card';
import {Spinner} from 'components/Spinner';

interface ListProps {
    items?: ListItem[];
    hasNavigation?: boolean;
    standardSize?: boolean;
    isLoading: boolean;
}

const List = ({items, isLoading, standardSize, hasNavigation = true}: ListProps): JSX.Element => {
    return (
        <Container row>
            {isLoading && <Spinner />}
            {!isLoading &&
                items.map(({url, id, dataRows, navigationProps}, index) => {
                    return (
                        <Card
                            key={`${id}-${index}`}
                            id={id}
                            dataRows={dataRows}
                            standardSize={standardSize}
                            navigationProps={navigationProps}
                            hasNavigation={hasNavigation}
                            url={url}
                        />
                    );
                })}
        </Container>
    );
};

export default List;
