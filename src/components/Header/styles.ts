import styled from 'styled-components';

export const HeaderContainer = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    &.with-search {
        flex-direction: row;
    }
`;

export const Title = styled.h1`
    color: #00325A;
`;

export const NavigationHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

export const BackButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: transparent;
`;

export const BackButtonIcon = styled.img`
    width: 40px;
    height: 40px;
`;

export const SearchBarButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: transparent;
`;

export const SearchBarIcon = styled.img`
    height: 30px;
    width: 50px;
    cursor: pointer;
    margin-top: 5px;
`;
