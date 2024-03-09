import * as React from 'react';
import {useLocation} from 'react-router-dom';
import Card from 'components/Card';
import {Container} from 'components/GlobalComponents';
import Header from 'components/Header';
import {useDataMapper} from 'hooks/useDataMapper';

const UserOverview = () => {
    const user = useLocation();
    const userInfo = useDataMapper().mapUserInfo(user.state);
    
    return (
        <Container>
            <Header
                title={`User ${user.state.firstName} ${user.state.lastName}`}
                hasSearchIcon={false}
            />
            <Card 
                dataRows={userInfo.dataRows}
                hasNavigation={false}
                navigationProps={userInfo.navigationProps}
            />
        </Container>
    );
};

export default UserOverview;
