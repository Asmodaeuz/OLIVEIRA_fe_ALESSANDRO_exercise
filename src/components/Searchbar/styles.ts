import styled from 'styled-components';

export const SearchContainer = styled.div<{showSearchBar: boolean}>`
    flex: 1;
    display: flex;
    margin: 10px 0 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${props => props.showSearchBar ? '#00325A' : 'transparent'};
    font-weight: bold;
    padding: 10px 0;
    transition: all .5s ease-in-out;
    transform: translateY(${props => props.showSearchBar ? '0' : '-30%'});
    visibility: ${props => props.showSearchBar ? 'visible' : 'hidden'}
`;

export const SearchForm = styled.form`
    display: flex;
    justify-content: space-between;
    width: 80%;
`;

export const SearchInput = styled.input`
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: #FFFFFF;
    width: 100%;

    &::placeholder {
        color: #FFFFFF;
        font-style: italic;
        font-weight: normal;
    }
`;

export const SearchSubmitButton = styled.button`
    border-radius: 0;
    border: 1px solid #FFFFFF;
    background-color: transparent;
    padding: 10px 15px;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover {
        background-color: #FFFFFF;
        color: #00325A;
    }
`;
