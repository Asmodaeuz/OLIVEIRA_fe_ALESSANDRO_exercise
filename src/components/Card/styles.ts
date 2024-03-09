import styled from 'styled-components';

export const Container = styled.div<{hasNavigation: boolean, standardSize?: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #00325A;
    border-radius: 8px;
    background-color: transparent;
    font-size: 14px;
    color: #00325A;
    padding: 20px;
    width: 250px;
    max-height: 200px;
    margin: 5px;
    transition: all .3s ease-in-out; 
    ${props => props.standardSize && `
        height: 40px;
    `}
    ${props => props.hasNavigation && `
        cursor: pointer;

        &:hover {
            background-color: #00BEC8;
            color: #FFFFFF;
            border-color: transparent;
        }
    `}
`;
